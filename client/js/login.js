function toggleForms(){
  const loginForm=document.getElementById('login');
  const signupForm = document.getElementById("signup");
  loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
} 

// Signup form validation and submission
document.getElementById('signup-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('user').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  // Clear previous errors
  document.getElementById('signup-username-error').textContent = '';
  document.getElementById('signup-email-error').textContent = '';
  document.getElementById('signup-password-error').textContent = '';

  // Validation patterns
  const usernamePattern = /^\w{3,15}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Username validation
  if (!usernamePattern.test(username)) {
    document.getElementById('signup-username-error').textContent = "Username must be 3-15 characters long and contain only letters, numbers, or underscores.";
    isValid = false;
  }

  // Email validation
  if (!emailPattern.test(email)) {
    document.getElementById('signup-email-error').textContent = "Enter a valid email address.";
    isValid = false;
  }

  // Password validation
  if (password.length < 6) {
    document.getElementById('signup-password-error').textContent = "Password must be at least 6 characters long.";
    isValid = false;
  }

  // If the form is valid, send the data
  if (isValid) {
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (data.success) {
        alert('Signup successful!');
        window.location.href = '/login'; // Redirect to login page
      } else {
        alert('Signup failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

// Login form validation and submission
document.getElementById('login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('user').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

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
  if (isValid) {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.success) {
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to dashboard or home
      } else {
        alert('Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
});

function closeForm() {
  document.getElementById("login").style.display = "none";
  document.getElementById("signup").style.display = "none";
  
  //get the last page url from the site
  const lastPage=sessionStorage.getItem('lastPage');

  //redirect the page to last page or home
  window.location.href=lastPage || 'index.html';
}
