/*
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login / Signup</title>
  <link rel="stylesheet" href="../css/login.css" />
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
</head>

<body>

  <!-- Signup form -->
  <div class="wrapper" id="signup" style="display: none;">
    <h1 class="form-title">Register</h1>
    <form id="signup-form">
      <span><i class='bx bx-x' onclick="closeForm()"></i></span>

      <div class="input-box">
        <input type="text" id="signup-username" placeholder="Username" required />
        <i class="bx bxs-user"></i>
        <div class="error" id="signup-username-error"></div>
      </div>
      <div class="input-box">
        <input type="email" id="signup-email" placeholder="Email" required />
        <i class="bx bxs-envelope"></i>
        <div class="error" id="signup-email-error"></div>
      </div>
      <div class="input-box">
        <input type="password" id="signup-password" placeholder="Password" required />
        <i class="bx bxs-lock-alt"></i>
        <div class="error" id="signup-password-error"></div>
      </div>

      <div class="remember-forgot">
        <label><input type="checkbox" id="signup-check" /> Agree to terms & conditions</label>
      </div>

      <button type="submit" class="btn">Signup</button>
      <div class="register-link">
        <p>Already have an account? <a href="#" onclick="toggleForms()">Login</a></p>
      </div>
    </form>
  </div>

  <!-- Login form -->
  <div class="wrapper" id="login">
    <h1 class="form-title">Login</h1>
    <form id="login-form">
      <span><i class='bx bx-x' onclick="closeForm()"></i></span>

      <div class="input-box">
        <input type="text" id="login-username" placeholder="Username" required />
        <i class="bx bxs-user"></i>
        <div class="error" id="login-username-error"></div>
      </div>

      <div class="input-box">
        <input type="password" id="login-password" placeholder="Password" required />
        <i class="bx bxs-lock-alt"></i>
        <div class="error" id="login-password-error"></div>
      </div>

      <div class="remember-forgot">
        <label><input type="checkbox" id="login-check" /> Remember me</label>
        <a href="#">Forgot password</a>
      </div>

      <button type="submit" class="btn">Login</button>
      <div class="register-link">
        <p>Don't have an account? <a href="#" onclick="toggleForms()">Register</a></p>
      </div>
    </form>
  </div>

  <!-- JS script -->
  <script src="../js/login.js"></script>
</body>

</html>
*/

/*
window.addEventListener('DOMContentLoaded', () => {

// Toggle between login and signup forms
window.toggleForms = function () {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
  };

// Close forms
window.closeForm = function () {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    const lastPage = sessionStorage.getItem('lastPage');
    window.location.href = lastPage || 'index.html';
};


// Signup form validation and submission
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  // Clear previous errors
  document.getElementById('signup-username-error').textContent = '';
  document.getElementById('signup-password-error').textContent = '';
  document.getElementById('signup-email-error').textContent = '';

  // Validation patterns
  const usernamePattern = /^\w{3,15}$/;

  // Username validation
  if (!usernamePattern.test(username)) {
    document.getElementById('signup-username-error').textContent = "Username must be 3-15 characters long and contain only letters, numbers, or underscores.";
    isValid = false;
  }

  // Password validation
  if (!password || password.length < 6) {
    document.getElementById('signup-password-error').textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }

  if (!email) {
    alert("Email is required.");
    isValid = false;
  }

  // If the form is valid, send the data
  if (!isValid) return;
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();

      if (response.ok) {
      alert(data.message || 'Signup successful!');
      document.getElementById('signup-form').reset();
      toggleForms(); // Switch to login form
    } else {
      alert(data.message || 'Signup failed!');
    }
  } catch (error) {
    console.error('Signup error:', error);
    alert('Something went wrong.');
  }
});

// Login form validation and submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value.trim();

  // Clear previous errors
  document.getElementById('login-username-error').textContent = '';
  document.getElementById('login-password-error').textContent = '';

  // Username and password validation
  if (!username) {
    document.getElementById('login-username-error').textContent = "Username is required";
    isValid = false;
  }

  if (!password) {
    document.getElementById('login-password-error').textContent = "Password is required";
    isValid = false;
  }

  // If the form is valid, send the data
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }) // Ensure username is being sent
      });
      const data = await response.json();
      if (response.ok) {
      localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');
        document.getElementById('login-form').reset();

      const payload = JSON.parse(atob(data.token.split('.')[1]));
      if (payload.role === 'admin') {
    window.location.href = '/admin/views/admin-dashboard.html'; // redirect admin
  } else {
    window.location.href = 'index.html'; // redirect normal user
  }
} else {
  alert(data.message || 'Login failed!');
}
  } catch (error) {
    console.error('Login error:', error);
    alert('Something went wrong.');
  }
});

const userIcon = document.getElementById('user-icon');
  if (userIcon) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    userIcon.addEventListener('click', () => {
      window.location.href = isLoggedIn ? 'account.html' : 'login.html';
    });
  }

//logout function
 window.logout = function () {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
};
});

*/

/*

*/