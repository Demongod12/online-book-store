// Theme toggle logic
const themeIcon = document.getElementById('theme-icon');

// Check local storage for theme preference
let isDarkMode = localStorage.getItem('theme') === 'dark';

// Function to apply theme
const applyTheme = (darkMode) => {
  document.body.classList.toggle('dark-mode', darkMode);
  
  // Update the icon based on the mode
  if (darkMode) {
    themeIcon.classList.remove('bx-sun');
    themeIcon.classList.add('bx-moon');
  } else {
    themeIcon.classList.remove('bx-moon');
    themeIcon.classList.add('bx-sun');
  }
};

// Initialize theme based on preference
applyTheme(isDarkMode);

// Toggle theme on icon click
themeIcon.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  applyTheme(isDarkMode);
});

