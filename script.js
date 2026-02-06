const CUTOFF = 35;

const SECTIONAL_CUTOFF = {
  vocab: 15,
  ca: 15,
  desc: 12
};

const USERS = {
  "9151701": { password: "91517001", dob:"05-07-2000", name:"Deepanshu Yadav", vocab:{scored:16,total:20}, ca:{scored:17,total:20}, desc:{scored:16.5,total:30} },
  "8504002": { password: "85040002", dob:"25-11-2004", name:"Nikita Soni", vocab:{scored:20,total:20}, ca:{scored:20,total:20}, desc:{scored:12.5,total:30} },
  "8756203": { password: "87562003", dob:"10-08-2002", name:"Jyoti Yadav", vocab:{scored:20,total:20}, ca:{scored:15,total:20}, desc:{scored:14,total:30} },
  "6001104": { password: "60011004", dob:"29-11-1999", name:"Priyanka Dev", vocab:{scored:20,total:20}, ca:{scored:15,total:20}, desc:{scored:14,total:30} },
  "6205705": { password: "62057005", dob:"25-12-2003", name:"Priyanka Verma", vocab:{scored:20,total:20}, ca:{scored:12,total:20}, desc:{scored:19,total:30} },
  "8303906": { password: "83039006", dob:"27-07-2003", name:"Adweta Sen", vocab:{scored:20,total:20}, ca:{scored:15,total:20}, desc:{scored:14,total:30},
  "7878107": { password: "78781007", dob:"20-11-2003", name:"Shivani Jha", vocab:{scored:20,total:20}, ca:{scored:15,total:20}, desc:{scored:14,total:30},
  "8534808": { password: "85348008", dob:"27-07-2003", name:"Shweta Yadav", vocab:{scored:20,total:20}, ca:{scored:15,total:20}, desc:{scored:14,total:30},  }
};

function genCaptcha() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 5; i++) s += chars[Math.floor(Math.random()*chars.length)];
  document.getElementById("captchaText").textContent = s;
  return s;
}

let CURRENT_CAPTCHA = "";

window.onload = function () {
  CURRENT_CAPTCHA = genCaptcha();
};

function calculateRankAndPercentile(roll) {
  const totals = Object.entries(USERS).map(([r,u]) => ({
    roll: r,
    total: u.vocab.scored + u.ca.scored + u.desc.scored
  })).sort((a,b)=>b.total-a.total);

  const totalCandidates = totals.length;
  const rank = totals.findIndex(x => x.roll === roll) + 1;
  const percentile = (((totalCandidates - rank) / totalCandidates) * 100).toFixed(2) + "%";
  return { rank, percentile };
}

function login() {
  const roll = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const captchaInput = document.getElementById("captchaInput").value.trim();
  const err = document.getElementById("error");

  if (!roll || !password || !dob || !captchaInput) {
    err.textContent = "Please fill all fields.";
    return;
  }

  if (captchaInput !== CURRENT_CAPTCHA) {
    err.textContent = "Invalid CAPTCHA. Try again.";
    CURRENT_CAPTCHA = genCaptcha();
    return;
  }

  if (!USERS[roll] || USERS[roll].password !== password || USERS[roll].dob !== dob) {
    err.textContent = "Invalid credentials. Please check details.";
    CURRENT_CAPTCHA = genCaptcha();
    return;
  }

  err.textContent = "";
  const u = USERS[roll];

  const totalObtained = (u.vocab.scored + u.ca.scored + u.desc.scored).toFixed(1);

  const vocabClear = u.vocab.scored >= SECTIONAL_CUTOFF.vocab;
  const caClear = u.ca.scored >= SECTIONAL_CUTOFF.ca;
  const descClear = u.desc.scored >= SECTIONAL_CUTOFF.desc;
  const overallClear = totalObtained >= CUTOFF;

  const finalStatus = vocabClear && caClear && descClear && overallClear;

  const statusText = finalStatus ? "Congratulations! You have qualified the cut-off 🎉" 
                                 : "Sorry, you have not qualified the cut-off.";

  const statusClass = finalStatus ? "pass" : "fail";

  const rp = calculateRankAndPercentile(roll);

  document.getElementById("name").textContent = u.name;
  document.getElementById("rollShow").textContent = roll;
  document.getElementById("vocab").textContent = `${u.vocab.scored}/${u.vocab.total}`;
  document.getElementById("ca").textContent = `${u.ca.scored}/${u.ca.total}`;
  document.getElementById("desc").textContent = `${u.desc.scored}/${u.desc.total}`;
  document.getElementById("total").textContent = `${totalObtained} / 70`;
  document.getElementById("cutoff").textContent = CUTOFF;

  const statusEl = document.getElementById("status");
  statusEl.textContent = statusText;
  statusEl.className = statusClass;

  document.getElementById("rank").textContent = rp.rank;
  document.getElementById("percentile").textContent = rp.percentile;

  document.getElementById("loginCard").style.display = "none";
  document.getElementById("resultCard").style.display = "block";
}

function logout() {
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("roll").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("captchaInput").value = "";
  CURRENT_CAPTCHA = genCaptcha();
}
