// ------------------------------------ HOME ----------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const homeBtn = document.getElementById('homeBtn');
    const bookingsBtn = document.getElementById('bookingsBtn');
    const profileBtn = document.getElementById('profileBtn');

    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = 'index.html'; 
        });
    }

    if (bookingsBtn) {
        bookingsBtn.addEventListener('click', () => {
            window.location.href = 'bookings.html'; 
        });
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', () => {
            window.location.href = 'profile.html'; 
        });
    }
});
