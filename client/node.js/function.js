// Simulate user authentication state
let isLoggedIn = sessionStorage.getItem("loggedIn") === "true";

//store last html page to open the user profile
sessionStorage.setItem('lastPage',window.location.href);

// Function to handle user icon click
function handleUserClick() {
  if (isLoggedIn) {
    // Redirect to account page if logged in
    window.location.href = "account.html";
  } else {
    // Redirect to login page if not logged in
    window.location.href = "login.html";
  }
}

function toggleCart() {
  const cart = document.getElementById('offcanvas-cart');

  if (!cart.classList.contains('loaded')) {
      // Load the cart content dynamically if not already loaded
      fetch('../html/cart.html')
          .then(response => response.text())
          .then(html => {
              cart.innerHTML = html; // Inject cart.html content
              cart.classList.add('loaded');
              cart.querySelector('.close-btn').addEventListener('click', () => {
                  cart.classList.remove('active'); // Close cart
              });
          })
          .catch(err => console.error('Error loading cart:', err));
  }

  // Toggle visibility
  cart.classList.toggle('active');
}
