// --------------------
// Handle Login
// --------------------
function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

// --------------------
// Handle Signup
// --------------------
function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const phone = document.getElementById("signupPhone").value;
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (password !== confirm) {
    alert("Passwords do not match!");
    return;
  }

  // Subscription selection
  let plan = "";
  document.querySelectorAll("input[name='subscription']").forEach(cb => {
    if (cb.checked) plan = cb.value;
  });

  if (!plan) {
    alert("Please select a subscription plan.");
    return;
  }

  // Save to localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userPhone", phone);
  localStorage.setItem("userPassword", password);
  localStorage.setItem("userPlan", plan);
  localStorage.setItem("subscriptionDate", new Date().toISOString());

  alert("Sign Up Successful! Redirecting to Login...");
  window.location.href = "login.html";
}

// --------------------
// Welcome User on Dashboard
// --------------------
document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("userName");
  if (username) {
    const welcome = document.getElementById("welcomeUser");
    if (welcome) welcome.textContent = `Welcome, ${username}`;
  }

  // Profile data
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profilePhone = document.getElementById("profilePhone");
  const profilePlan = document.getElementById("profilePlan");
  const profileExpiry = document.getElementById("profileExpiry");

  if (profileName) {
    profileName.textContent = localStorage.getItem("userName") || "-";
    profileEmail.textContent = localStorage.getItem("userEmail") || "-";
    profilePhone.textContent = localStorage.getItem("userPhone") || "-";
    profilePlan.textContent = localStorage.getItem("userPlan") || "-";

    const subDate = new Date(localStorage.getItem("subscriptionDate"));
    if (!isNaN(subDate)) {
      let months = 1;
      if (localStorage.getItem("userPlan") === "standard") months = 3;
      if (localStorage.getItem("userPlan") === "premium") months = 12;
      const expiry = new Date(subDate);
      expiry.setMonth(expiry.getMonth() + months);
      profileExpiry.textContent = expiry.toDateString();
    }
  }

  // Charts
  const powerChart = document.getElementById("powerChart");
  if (powerChart) {
    new Chart(powerChart, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Power Generated",
            data: [12, 19, 14, 20, 22, 18, 24],
            borderColor: "green",
            fill: false
          },
          {
            label: "Power Consumed",
            data: [10, 15, 13, 17, 19, 14, 21],
            borderColor: "red",
            fill: false
          }
        ]
      }
    });
  }

  const predictedChart = document.getElementById("predictedChart");
  if (predictedChart) {
    new Chart(predictedChart, {
      type: "bar",
      data: {
        labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
        datasets: [
          {
            label: "Predicted Power Requirement",
            data: [15, 18, 20, 22, 19],
            backgroundColor: "orange"
          }
        ]
      }
    });
  }
});

// --------------------
// Dropdown Toggles
// --------------------
function toggleMenu(id) {
  const menu = document.getElementById(id);
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

document.addEventListener("click", (e) => {
  if (e.target.id === "profileBtn") toggleMenu("profileMenu");
  else if (e.target.id === "notificationsBtn") toggleMenu("notificationsMenu");
  else if (e.target.id === "settingsBtn") toggleMenu("settingsMenu");
  else if (e.target.id === "mygridBtn") toggleMenu("mygridMenu");
  else {
    // Close menus when clicking outside
    document.querySelectorAll(".dropdown-menu").forEach(m => m.style.display = "none");
  }
});

// --------------------
// Logout
// --------------------
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}

// --------------------
// Theme Toggle
// --------------------
function toggleTheme() {
  if (document.body.dataset.theme === "dark") {
    document.body.dataset.theme = "light";
    document.body.style.background = "linear-gradient(135deg, #f4b400, #3e7c59)";
  } else {
    document.body.dataset.theme = "dark";
    document.body.style.background = "linear-gradient(135deg, #333, #000)";
  }
}

// --------------------
// Dummy CSV download
// --------------------
function downloadCSV(filename) {
  const csvContent = "data:text/csv;charset=utf-8,Sample Data\nValue1,Value2,Value3";
  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
