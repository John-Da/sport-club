var header = document.getElementById("navbar");
var btns = header.getElementsByClassName(".nav-item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const flashMessages = document.getElementById("flash-messages");
  
  if (flashMessages) {
      // Set a timeout to hide the flash messages after 3 seconds
      setTimeout(() => {
          flashMessages.style.display = "none"; // Hide the messages
      }, 3000); // 3000 milliseconds = 3 seconds
  }
});
