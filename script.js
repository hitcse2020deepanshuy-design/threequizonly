const CUTOFF = 42; // Overall cutoff out of 70

const SECTIONAL_CUTOFF = {
  hindu: 15,
  ca: 15,
  desc: 12
};

const USERS = {
  "9151701": { password: "91517001", dob:"05-07-2000", name:"Deepanshu Yadav",
    hindu:{scored:20,total:20}, ca:{scored:20,total:20}, desc:{scored:25,total:30} },

  "8504002": { password: "85040002", dob:"25-11-2004", name:"Nikita Soni",
    hindu:{scored:14,total:20}, ca:{scored:11,total:20}, desc:{scored:10,total:30} },

  "8756203": { password: "87562003", dob:"10-08-2002", name:"Jyoti Yadav",
    hindu:{scored:18,total:20}, ca:{scored:18,total:20}, desc:{scored:20,total:30} },

  "6001104": { password: "60011004", dob:"29-11-1999", name:"Priyanka Dev",
    hindu:{scored:19,total:20}, ca:{scored:16,total:20}, desc:{scored:18,total:30} },

  "6205705": { password: "62057005", dob:"25-12-2003", name:"Priyanka Verma",
    hindu:{scored:12,total:20}, ca:{scored:8,total:20}, desc:{scored:15,total:30} },

  "8303906": { password: "83039006", dob:"27-07-2003", name:"Adweta Sen",
    hindu:{scored:null,total:20}, ca:{scored:null,total:20}, desc:{scored:null,total:30} },

  "7878107": { password: "78781007", dob:"20-11-2003", name:"Shivani Jha",
    hindu:{scored:6,total:20}, ca:{scored:10,total:20}, desc:{scored:12,total:30} },

  "8534808": { password: "85348008", dob:"06-06-2002", name:"Shweta Yadav",
    hindu:{scored:8,total:20}, ca:{scored:13,total:20}, desc:{scored:18,total:30} }
};

// Captcha
let a = Math.floor(Math.random()*9)+1;
let b = Math.floor(Math.random()*9)+1;
document.getElementById("captchaQ").textContent = `${a} + ${b} = ?`;

function login() {
  const roll = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const captchaAns = document.getElementById("captchaAns").value.trim();
  const err = document.getElementById("error");

  if (!roll || !password || !dob || !captchaAns) {
    err.textContent = "Please fill all fields.";
    return;
  }

  if (parseInt(captchaAns) !== (a + b)) {
    err.textContent = "Invalid captcha.";
    return;
  }

  if (!USERS[roll] || USERS[roll].password !== password || USERS[roll].dob !== dob) {
    err.textContent = "Invalid credentials.";
    return;
  }

  const u = USERS[roll];

  const hindu = u.hindu.scored ?? 0;
  const ca = u.ca.scored ?? 0;
  const desc = u.desc.scored ?? 0;

  const total = hindu + ca + desc;

  const hinduClear = u.hindu.scored !== null && hindu >= SECTIONAL_CUTOFF.hindu;
  const caClear = u.ca.scored !== null && ca >= SECTIONAL_CUTOFF.ca;
  const descClear = u.desc.scored !== null && desc >= SECTIONAL_CUTOFF.desc;

  const finalStatus = hinduClear && caClear && descClear && total >= CUTOFF;

  document.getElementById("name").textContent = u.name;
  document.getElementById("rollShow").textContent = roll;

  document.getElementById("hindu").textContent = `${hindu}/20${hinduClear ? "" : " *"}`;
  document.getElementById("ca").textContent = `${ca}/20${caClear ? "" : " *"}`;
  document.getElementById("desc").textContent = `${desc}/30${descClear ? "" : " *"}`;

  document.getElementById("total").textContent = `${total} / 70`;
  document.getElementById("cutoff").textContent = CUTOFF;

  const statusEl = document.getElementById("status");
  statusEl.textContent = finalStatus ? "Qualified" : "Not Qualified";
  statusEl.className = finalStatus ? "pass" : "fail";

  document.getElementById("loginCard").style.display = "none";
  document.getElementById("resultCard").style.display = "block";
}

function logout() {
  location.reload();
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;

  const name = document.getElementById("name").textContent;
  const roll = document.getElementById("rollShow").textContent;
  const hindu = document.getElementById("hindu").textContent;
  const ca = document.getElementById("ca").textContent;
  const desc = document.getElementById("desc").textContent;
  const total = document.getElementById("total").textContent;
  const status = document.getElementById("status").textContent;

  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("OFFICIAL MARKSHEET", 105, 20, { align: "center" });
  doc.setFontSize(11);
  doc.text("Online Result Portal", 105, 28, { align: "center" });

  doc.text(`Name: ${name}`, 20, 45);
  doc.text(`Roll No: ${roll}`, 20, 55);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 55);

  doc.setFontSize(12);
  doc.text("Subject", 20, 75);
  doc.text("Marks", 150, 75);
  doc.line(20, 78, 190, 78);

  doc.setFontSize(11);
  doc.text("The Hindu Editorial", 20, 90);
  doc.text(hindu, 150, 90);

  doc.text("Current Affairs", 20, 105);
  doc.text(ca, 150, 105);

  doc.text("Descriptive Writing", 20, 120);
  doc.text(desc, 150, 120);

  doc.setFontSize(12);
  doc.text(`Total Marks: ${total}`, 20, 145);
  doc.text(`Final Status: ${status}`, 20, 160);

  doc.text("Authorized Signatory", 140, 190);
  doc.line(135, 192, 190, 192);

  doc.setTextColor(200, 200, 200);
  doc.setFontSize(40);
  doc.text("OFFICIAL RESULT", 105, 140, { angle: 45, align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.text("This is a system generated marksheet.", 105, 285, { align: "center" });

  doc.save(`${roll}_Official_Marksheet.pdf`);
}
