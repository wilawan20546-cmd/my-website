const form = document.getElementById("repairForm");
const caseList = document.getElementById("caseList");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const caseId = "CASE-" + Date.now().toString().slice(-5);

  const name = document.getElementById("name").value;
  const house = document.getElementById("house").value;
  const phone = document.getElementById("phone").value;
  const type = document.getElementById("type").value;
  const detail = document.getElementById("detail").value;

  const caseCard = document.createElement("div");
  caseCard.className = "case-card";

  caseCard.innerHTML = `
  <div class="card-header">
    <h3>${caseId}</h3>
    <span class="status status-new">รับเรื่องแล้ว</span>
  </div>

  <p><strong>ผู้แจ้ง:</strong> ${name}</p>
  <p><strong>บ้านเลขที่:</strong> ${house}</p>
  <p><strong>เบอร์โทร:</strong> ${phone}</p>
  <p><strong>ประเภท:</strong> ${type}</p>
  <p><strong>รายละเอียด:</strong> ${detail}</p>

  <div class="actions">
    <button onclick="updateStatus(this, 'processing')">กำลังดำเนินการ</button>
    <button onclick="updateStatus(this, 'done')">เสร็จสิ้น</button>
  </div>
`;

  caseList.prepend(caseCard);

  form.reset();

  alert("ส่งเรื่องเรียบร้อย เลขเคสของคุณคือ " + caseId);
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

    const card = document.createElement("div");
    card.className = "case-card";

 card.innerHTML = `
  <div class="card-header">
    <h3>${requestId}</h3>
    <span class="status status-new">รอตรวจสอบคำร้อง</span>
  </div>

  <p><strong>ประเภท:</strong> รีโนเวท</p>
  <p><strong>ผู้ยื่นคำร้อง:</strong> ${name}</p>
  <p><strong>บ้านเลขที่:</strong> ${house}</p>
  <p><strong>เบอร์โทร:</strong> ${phone}</p>
  <p><strong>ประเภทงาน:</strong> ${type}</p>
  <p><strong>วันที่เริ่ม:</strong> ${start}</p>
  <p><strong>วันที่สิ้นสุด:</strong> ${end}</p>
  <p><strong>รายละเอียด:</strong> ${detail}</p>

  <div class="actions">
    <button onclick="updateStatus(this, 'processing')">กำลังดำเนินการ</button>
    <button onclick="updateStatus(this, 'done')">เสร็จสิ้น</button>
  </div>
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