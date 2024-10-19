// Add this to your base template or a separate JS file
document.addEventListener('DOMContentLoaded', function() {
    // Make flash messages dismissible
    document.querySelectorAll('.alert').forEach(function(alert) {
        alert.addEventListener('click', function() {
            alert.style.display = 'none';
        });
    });

    // Automatically remove flash messages after 5 seconds
    setTimeout(function() {
        document.querySelectorAll('.alert').forEach(function(alert) {
            alert.style.display = 'none';
        });
    }, 5000);
});