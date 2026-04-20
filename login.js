// Modal functions
function openLoginModal() {
  document.getElementById("login-modal").style.display = "block";
  document.body.classList.add("modal-open");
}

function closeLoginModal() {
  document.getElementById("login-modal").style.display = "none";
  document.body.classList.remove("modal-open");
}

// Login handling
async function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch(`path/to/your/json/files/${username}_.json`);
    if (!response.ok) throw new Error("Network response was not ok");

    const account = await response.json();
    if (account) {
      if (password === account.pass) {
        alert("Login successful!");
        sessionStorage.setItem("isLoggedIn", "true"); // Save login state
        sessionStorage.setItem("username", username); // Save username (optional)
        closeLoginModal();
        document.getElementById("main-content").style.display = "block";
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("Account not found.");
    }
  } catch (error) {
    console.error("Error fetching account:", error);
    alert("Error logging in. Please try again later.");
  }
}

// Event listener for the login form
document.getElementById("login-form").addEventListener("submit", handleLogin);

// Show login modal only when login button is clicked
document.getElementById("login-btn").addEventListener("click", function () {
  if (!sessionStorage.getItem("isLoggedIn")) {
    openLoginModal();
  } else {
    document.getElementById("main-content").style.display = "block"; // Show main content if logged in
  }
});

// Logout function
function logout() {
  sessionStorage.removeItem("isLoggedIn"); // Clear login state
  sessionStorage.removeItem("username"); // Clear username (optional)
  document.getElementById("main-content").style.display = "none"; // Hide main content
  openLoginModal(); // Reopen login modal
}
