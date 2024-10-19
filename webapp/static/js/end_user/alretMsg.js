document.addEventListener("DOMContentLoaded", function() {
    const flashMessages = document.getElementById("flash-messages");
    
    if (flashMessages) {
        // Set a timeout to hide the flash messages after 3 seconds
        setTimeout(() => {
            flashMessages.style.display = "none"; // Hide the messages
        }, 3000); // 3000 milliseconds = 3 seconds
    }
});
