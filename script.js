const CUTOFF = 35;

const SECTIONAL_CUTOFF = {
  vocab: 15,
  ca: 15,
  desc: 12
};

const USERS = {
  "9151701": { name:"Deepanshu Yadav", password:"9151001", dob:"05-07-2000", total: 49.5, vocab: 16, ca: 17, desc: 16.5 },
  "8504002": { name:"Nikita Soni", password:"85040002", dob:"25-11-2004", total: 52.5, vocab: 20, ca: 20, desc: 12.5 },
  "8756203": { name:"Jyoti Yadav", password:"87562003", dob:"10-08-2002", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "6001104": { name:"Priyanka Dev", password:"60011004", dob:"29-11-1999", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "6205705": { name:"Priyanka Verma", password:"62057005", dob:"25-12-203", total: 53.0, vocab: 20, ca: 14, desc: 19 },
  "8303906": { name:"Adweta Sen", password:"83039006", dob:"27-07-2003", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "7878106": { name:"Shivani Jha", password:"78781006", dob:"20-11-2003", total: 49.0, vocab: 20, ca: 15, desc: 14 },
  "8534806": { name:"Shweta Yadav", password:"85348006", dob:"27-07-2003", total: 49.0, vocab: 20, ca: 15, desc: 14 }
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



