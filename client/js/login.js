window.addEventListener('DOMContentLoaded', () => {

  // --- Toggle forms ---
  window.toggleForms = () => {
    const loginForm = document.getElementById('login');
    const signupForm = document.getElementById('signup');
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
  };

  // --- Close forms ---
  window.closeForm = () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "none";
    const lastPage = sessionStorage.getItem('lastPage');
    window.location.href = lastPage || 'index.html';
  };

  // --- SIGNUP ---
  const signupForm = document.getElementById('signup-form');
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();

    let isValid = true;
    document.getElementById('signup-username-error').textContent = '';
    document.getElementById('signup-email-error').textContent = '';
    document.getElementById('signup-password-error').textContent = '';

    if (!/^\w{3,15}$/.test(username)) {
      document.getElementById('signup-username-error').textContent = "3-15 chars, letters/numbers/_ only";
      isValid = false;
    }
    if (!email) {
      document.getElementById('signup-email-error').textContent = "Email required";
      isValid = false;
    }
    if (password.length < 6) {
      document.getElementById('signup-password-error').textContent = "Password min 6 chars";
      isValid = false;
    }
    if (!isValid) return;

    try {
      const res = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message || "Signup successful!");
        signupForm.reset();
        toggleForms(); // switch to login
      } else alert(data.message || "Signup failed!");
    } catch (err) { console.error(err); alert("Something went wrong."); }
  });

  // --- LOGIN ---
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    document.getElementById('login-username-error').textContent = '';
    document.getElementById('login-password-error').textContent = '';

    if (!username) { document.getElementById('login-username-error').textContent = "Required"; return; }
    if (!password) { document.getElementById('login-password-error').textContent = "Required"; return; }

    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        // --- Changes made here ---
        localStorage.setItem('token', data.token);
        localStorage.setItem('isLoggedIn', 'true');

        const payload = JSON.parse(atob(data.token.split('.')[1]));
        if (payload.role === 'admin') window.location.href = '/admin/views/admin-dashboard.html';
        else window.location.href = 'index.html';
        // --- End changes ---
      } else alert(data.message || "Login failed!");
    } catch (err) { console.error(err); alert("Something went wrong."); }
  });

  // --- Helper for all protected fetch calls ---
  window.fetchWithToken = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
    return fetch(url, options);
  };

  // --- User icon ---
  const userIcon = document.getElementById('user-icon');
  if (userIcon) {
    userIcon.addEventListener('click', () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      window.location.href = isLoggedIn ? 'account.html' : 'login.html';
    });
  }

  // --- Logout ---
  window.logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
  };
});
