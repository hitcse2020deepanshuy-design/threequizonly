const CUTOFF = 35;

const SECTIONAL_CUTOFF = {
  vocab: 15,
  ca: 15,
  desc: 12
};

const USERS = {
  "12345601": { name:"Deepanshu Yadav", password:"123456701", dob:"01-01-2000", total: 49.5, vocab: 16, ca: 17, desc: 16.5 },
  "12345602": { name:"Nikita Soni", password:"123456702", dob:"02-02-2000", total: 52.5, vocab: 20, ca: 20, desc: 12.5 },
  "12345603": { name:"Jyoti Yadav", password:"123456703", dob:"03-03-2000", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "12345604": { name:"Priyanka Dev", password:"123456704", dob:"04-04-2000", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "12345605": { name:"Goyal", password:"123456705", dob:"05-05-2000", total: 53.0, vocab: 20, ca: 14, desc: 19 },
  "12345606": { name:"Adweta Sen", password:"123456706", dob:"06-06-2000", total: 49.0, vocab: 20, ca: 15, desc: 14 }
};

function login() {
  const nameInput = document.getElementById("nameInput").value.trim().toLowerCase();
  const roll = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value.trim();
  const dob = document.getElementById("dob").value.trim();
  const err = document.getElementById("error");

  if (!nameInput || !roll || !password || !dob) {
    err.textContent = "Please fill all fields.";
    return;
  }

  const user = USERS[roll];
  if (!user || user.password !== password || user.dob !== dob || user.name.toLowerCase() !== nameInput) {
    err.textContent = "Invalid details. Please check Name, Roll No, Password, or DOB.";
    return;
  }

  // Sectional cut-off check
  const vocabClear = user.vocab >= SECTIONAL_CUTOFF.vocab;
  const caClear = user.ca >= SECTIONAL_CUTOFF.ca;
  const descClear = user.desc >= SECTIONAL_CUTOFF.desc;

  // Overall cut-off check
  const overallClear = user.total >= CUTOFF;

  // Final qualification rule (IBPS style)
  const qualified = vocabClear && caClear && descClear && overallClear;

  const statusText = qualified ? "PROVISIONALLY QUALIFIED" : "NOT QUALIFIED";

  document.getElementById("nameShow").textContent = user.name;
  document.getElementById("rollShow").textContent = roll;

  const statusEl = document.getElementById("status");
  statusEl.textContent = statusText;
  statusEl.className = qualified ? "pass" : "fail";

  const congrats = document.getElementById("congrats");
  if (qualified) {
    congrats.style.display = "block";
    congrats.innerHTML = `
      🎉 <strong>Congratulations!</strong><br/>
      You have successfully cleared the overall and sectional cut-offs.
      Please stay connected for further instructions regarding the next stage.
    `;
  } else {
    congrats.style.display = "none";
  }

  document.getElementById("loginCard").style.display = "none";
  document.getElementById("resultCard").style.display = "block";
}

function logout() {
  document.getElementById("loginCard").style.display = "block";
  document.getElementById("resultCard").style.display = "none";
  document.getElementById("nameInput").value = "";
  document.getElementById("roll").value = "";
  document.getElementById("password").value = "";
  document.getElementById("dob").value = "";
  document.getElementById("error").textContent = "";
}
