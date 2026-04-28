import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "samaedum-web",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
let cases = JSON.parse(localStorage.getItem("cases")) || [];
let renovations = JSON.parse(localStorage.getItem("renovations")) || [];
const form = document.getElementById("repairForm");
const caseList = document.getElementById("caseList");

form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const house = document.getElementById("house").value;
  const phone = document.getElementById("phone").value;
  const type = document.getElementById("type").value;
  const detail = document.getElementById("detail").value;
  
await addDoc(collection(db, "repairs"), {
  name: name,
  house: house,
  phone: phone,
  type: type,
  detail: detail,
  status: "รับเรื่องแล้ว"
});
  form.reset();
  loadCases();
  alert("ส่งเรื่องเรียบร้อย!");
});
const renovationForm = document.getElementById("renovationForm");
const renovationList = document.getElementById("renovationList");

if (renovationForm && renovationList) {
  renovationForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const requestId = "RENO-" + Date.now().toString().slice(-5);

    const name = document.getElementById("renoName").value;
    const house = document.getElementById("renoHouse").value;
    const phone = document.getElementById("renoPhone").value;
    const type = document.getElementById("renoType").value;
    const start = document.getElementById("renoStart").value;
    const end = document.getElementById("renoEnd").value;
    const detail = document.getElementById("renoDetail").value;
    renovations.push({
  id: requestId,
  type: type,
  status: "รอตรวจสอบคำร้อง"
});

localStorage.setItem("renovations", JSON.stringify(renovations));

    const card = document.createElement("div");
    card.className = "case-card";

 card.innerHTML = `
  <div class="card-header">
    <h3>${requestId}</h3>
    <span class="status status-new">รอตรวจสอบคำร้อง</span>
  </div>

  <p><strong>ประเภท:</strong> คำร้องรีโนเวท</p>
  <p><strong>ประเภทงาน:</strong> ${type}</p>
`;
    function updateStatus(button, status) {
  const card = button.closest(".case-card");
  const statusEl = card.querySelector(".status");

  if (status === "processing") {
    statusEl.textContent = "กำลังดำเนินการ";
    statusEl.className = "status status-processing";
  }

  if (status === "done") {
    statusEl.textContent = "เสร็จสิ้น";
    statusEl.className = "status status-done";
  }
}

    renovationList.prepend(card);
    renovationForm.reset();

    alert("ส่งคำร้องเรียบร้อย เลขคำร้องของคุณคือ " + requestId);
  });
}
function updateStatus(button, status) {
  const card = button.closest(".case-card");
  const statusEl = card.querySelector(".status");

  if (status === "processing") {
    statusEl.textContent = "กำลังดำเนินการ";
    statusEl.className = "status status-processing";
  }

  if (status === "done") {
    statusEl.textContent = "เสร็จสิ้น";
    statusEl.className = "status status-done";
  }
}
function renderCases() {
  caseList.innerHTML = "";

  cases.forEach(c => {
    const div = document.createElement("div");
    div.className = "case-card";

    div.innerHTML = `
      <div class="card-header">
        <h3>${c.id}</h3>
        <span class="status status-new">${c.status}</span>
      </div>

      <p><strong>ประเภทปัญหา:</strong> ${c.type}</p>
    `;

    caseList.prepend(div);
  });
}

renderCases();
renderRenovations();
function renderRenovations() {
  renovationList.innerHTML = "";

  renovations.forEach(function(item) {
    const div = document.createElement("div");
    div.className = "case-card";

    div.innerHTML = `
      <div class="card-header">
        <h3>${item.id}</h3>
        <span class="status status-new">${item.status}</span>
      </div>

      <p><strong>ประเภท:</strong> คำร้องรีโนเวท</p>
      <p><strong>ประเภทงาน:</strong> ${item.type}</p>
    `;

    renovationList.prepend(div);
  });
}
async function loadCases() {
  caseList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "repairs"));

  querySnapshot.forEach((doc) => {
    const data = doc.data();

    const caseCard = document.createElement("div");
    caseCard.className = "case-card";

caseCard.innerHTML = `
  <div class="card-header">
    <h3>${doc.id.slice(0, 8)}</h3>
    <span class="status status-new">${data.status}</span>
  </div>

  <p><strong>ชื่อ:</strong> ${data.name}</p>
  <p><strong>บ้าน:</strong> ${data.house}</p>
  <p><strong>ประเภท:</strong> ${data.type}</p>
  <p><strong>รายละเอียด:</strong> ${data.detail}</p>
`;

    caseList.appendChild(caseCard);
  });
}

loadCases();
