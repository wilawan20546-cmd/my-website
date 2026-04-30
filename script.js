import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXfF4OmkkNKdFCbZhtMTDvbtJGqFmqAW4",
  authDomain: "samaedum-web.firebaseapp.com",
  projectId: "samaedum-web",
  storageBucket: "samaedum-web.firebasestorage.app",
  messagingSenderId: "527304518216",
  appId: "1:527304518216:web:a3e8b5250ee55832e7867d",
  measurementId: "G-V3TG7GQNXW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("repairForm");
const caseList = document.getElementById("caseList");

let allCases = [];
let currentPage = 1;
const perPage = 5;

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  await addDoc(collection(db, "repairs"), {
    name: document.getElementById("name").value,
    house: document.getElementById("house").value,
    phone: document.getElementById("phone").value,
    type: document.getElementById("type").value,
    detail: document.getElementById("detail").value,
    status: "รอดำเนินการ",
    createdAt: serverTimestamp()
  });

  form.reset();
  currentPage = 1;
  await loadCases();
  alert("ส่งเรื่องแจ้งซ่อมเรียบร้อย!");
});

async function loadCases() {
  caseList.innerHTML = "";

  const q = query(collection(db, "repairs"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  allCases = [];

  snapshot.forEach((docSnap) => {
    allCases.push({
      id: docSnap.id,
      ...docSnap.data()
    });
  });

  renderCases();
}

function renderCases() {
  caseList.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const pageCases = allCases.slice(start, end);

  pageCases.forEach((item) => {
    const card = document.createElement("div");
    card.className = "case-card repair";

    card.innerHTML = `
      <div class="card-header">
        <h3>${item.id.slice(0, 8)}</h3>
        <span class="status ${getStatusClass(item.status)}">${item.status}</span>
      </div>

      <p><strong>ชื่อ:</strong> ${item.name || "-"}</p>
      <p><strong>บ้าน:</strong> ${item.house || "-"}</p>
      <p><strong>ประเภท:</strong> ${item.type || "-"}</p>
      <p><strong>รายละเอียด:</strong> ${item.detail || "-"}</p>

      <div class="actions">
        <button onclick="changeStatus('${item.id}', 'อยู่ระหว่างการแก้ไข')">นิติรับเรื่อง</button>
        <button onclick="changeStatus('${item.id}', 'เรียบร้อย')">แก้ไขเสร็จ</button>
      </div>
    `;

    caseList.appendChild(card);
  });

  renderPagination();
}

function renderPagination() {
  let oldPagination = document.getElementById("pagination");
  if (oldPagination) oldPagination.remove();

  const totalPages = Math.ceil(allCases.length / perPage);
  if (totalPages <= 1) return;

  const pagination = document.createElement("div");
  pagination.id = "pagination";
  pagination.className = "pagination";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;

    if (i === currentPage) {
      btn.classList.add("active");
    }

    btn.addEventListener("click", function () {
      currentPage = i;
      renderCases();
    });

    pagination.appendChild(btn);
  }

  caseList.after(pagination);
}

function getStatusClass(status) {
  if (status === "อยู่ระหว่างการแก้ไข") return "status-processing";
  if (status === "เรียบร้อย") return "status-done";
  return "status-new";
}

window.changeStatus = async function (id, newStatus) {
  await updateDoc(doc(db, "repairs", id), {
    status: newStatus
  });

  await loadCases();
};

loadCases();
