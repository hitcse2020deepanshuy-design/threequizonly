const CUTOFF = 24; // Out of 40

const SECTIONAL_CUTOFF = {
  hindu: 10,
  desc: 12
};

const USERS = {
  "9151701": { password:"91517001", dob:"05-07-2000", name:"Deepanshu Yadav", hindu:null, desc:null },
  "8504002": { password:"85040002", dob:"25-11-2004", name:"Nikita Soni", hindu:20, desc:null },
  "8756203": { password:"87562003", dob:"10-08-2002", name:"Jyoti Yadav", hindu:20, desc:20 },
  "6001104": { password:"60011004", dob:"29-11-1999", name:"Priyanka Dev", hindu:20, desc:13 },
  "6205705": { password:"62057005", dob:"25-12-2003", name:"Priyanka Verma", hindu:14, desc:16 },
  "8303906": { password:"83039006", dob:"27-07-2003", name:"Adweta Sen", hindu:null, desc:null },
  "7878107": { password:"78781007", dob:"20-11-2003", name:"Shivani Jha", hindu:null, desc:null },
  "8534808": { password:"85348008", dob:"06-06-2002", name:"Shweta Yadav", hindu:null, desc:null }
};

// Captcha
let a = Math.floor(Math.random()*9)+1;
let b = Math.floor(Math.random()*9)+1;
document.getElementById("captchaQ").textContent = `${a} + ${b} = ?`;

function login() {
  const roll = document.getElementById("roll").value.trim();
  const pass = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const cap = document.getElementById("captchaAns").value.trim();
  const err = document.getElementById("error");

  if (!roll || !pass || !dob || !cap) {
    err.textContent = "Please fill all fields.";
    return;
  }

  if (parseInt(cap) !== a + b) {
    err.textContent = "Invalid captcha.";
    return;
  }

  if (!USERS[roll] || USERS[roll].password !== pass || USERS[roll].dob !== dob) {
    err.textContent = "Invalid credentials.";
    return;
  }

  const u = USERS[roll];

  const hindu = u.hindu;
  const desc = u.desc;

  const total = (hindu ?? 0) + (desc ?? 0);

  const hinduClear = hindu !== null && hindu >= SECTIONAL_CUTOFF.hindu;
  const descClear = desc !== null && desc >= SECTIONAL_CUTOFF.desc;

  const qualified = hinduClear && descClear && total >= CUTOFF;

  document.getElementById("name").textContent = u.name;
  document.getElementById("rollShow").textContent = roll;

  document.getElementById("hindu").textContent =
    hindu === null ? "Not Attempted" : `${hindu}/20${hinduClear?"":" *"}`;

  document.getElementById("ca").textContent = "Not Covered Today";

  document.getElementById("desc").textContent =
    desc === null ? "Not Attempted" : `${desc}/20${descClear?"":" *"}`;

  document.getElementById("total").textContent = `${total} / 40`;
  document.getElementById("cutoff").textContent = CUTOFF;

  const status = document.getElementById("status");
  status.textContent = qualified ? "Qualified" : "Not Qualified";
  status.className = qualified ? "pass" : "fail";

  document.getElementById("loginCard").style.display = "none";
  document.getElementById("resultCard").style.display = "block";
}

function logout() {
  location.reload();
    }
