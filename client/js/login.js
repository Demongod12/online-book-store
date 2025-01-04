function toggleForms(){
  const loginForm=document.getElementById('login');
  const signupForm = document.getElementById("signup");
  loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
} 

document.getElementById('signup-form').addEventListener('submit',(event) =>{
  event.preventDefault();
  const username = document.getElementById('user').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  document.getElementById('signup-username-error').textContent = '';
  document.getElementById('signup-email-error').textContent = '';
  document.getElementById('signup-password-error').textContent = '';

  let usernamePattern = /^\w{3,15}$/;
  let emailPattern = /^$/;

  if(!usernamePattern.test(username)){
    document.getElementById('signup-username-error').textContent= "Username must be 3-15 character long and contain only letters, numbers, or underscore";
    isValid = false;
  }

  if(!emailPattern.text(email)){
    document.getElementById('signup-email-error').textContent= "Enter a valid email address.";
    isValid = false;
  }

  if(password<6){
    document.getElementById('signup-password-error').textContent= "Password must be at least 6 character long.";
    isValid = false;
  }

  if(isValid){
    alert("signup Successful!");
  }
});

document.getElementById('login-form').addEventListener('submit',(event) =>{
  event.preventDefault();
  const username = document.getElementById('user').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  document.getElementById('login-username-error').textContent = '';
  document.getElementById('login-password-error').textContent = '';

  if(!username){
    document.getElementById('login-username-error').textContent= "Username is required";
    isValid = false;
  }

  if(!password){
    document.getElementById('login-password-error').textContent= "Password is required";
    isValid = false;
  }

  if(!isValid){
    alert("Login Successful!");
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
