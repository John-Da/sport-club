const toggleButton = document.getElementById('toggleSidebar');
const sidebar = document.querySelector('aside');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('w-64');
    sidebar.classList.toggle('w-20');
    // Toggle visibility of text elements
    document.querySelectorAll('aside span:not(.material-symbols-rounded)').forEach(el => {
        el.classList.toggle('hidden');
    });
});

document.addEventListener("DOMContentLoaded", function() {
  const flashMessages = document.getElementById("flash-messages");
  
  if (flashMessages) {
      // Set a timeout to hide the flash messages after 3 seconds
      setTimeout(() => {
          flashMessages.style.display = "none"; // Hide the messages
      }, 3000); // 3000 milliseconds = 3 seconds
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const toggleButton = document.getElementById('toggleSidebar');
  const toggleIcon = document.getElementById('toggleIcon');
  
  toggleButton.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      
      // Rotate icon based on sidebar state
      if (sidebar.classList.contains('collapsed')) {
          toggleIcon.textContent = 'keyboard_double_arrow_right';
      } else {
          toggleIcon.textContent = 'keyboard_double_arrow_left';
      }
  });
});
