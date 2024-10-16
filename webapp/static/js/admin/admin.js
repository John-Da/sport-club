document.addEventListener('DOMContentLoaded', function() {
    const closeBtn = document.querySelector('.clOp');
    const sidebar = document.querySelector('.sidemenubar');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('.section');
    const sidebarLinks = document.querySelectorAll('.navbar a');
    const logoText = document.querySelector('.logo h2');
    const logoImg = document.querySelector('.logo img');

    console.log('Sections found:', sections.length);
    console.log('Close button found:', closeBtn !== null);

    function toggleSidebar() {
        sidebar.classList.toggle('sidebar-closed');
        navbar.classList.toggle('navbar-closed');
        closeBtn.classList.toggle('rotate');
        logoText.classList.toggle('hidden');
        logoImg.classList.toggle('visible');
    }

    function switchSection(sectionId) {
        console.log('Switching to section:', sectionId);
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.classList.add('active');
                section.style.display = 'block';
            } else {
                section.classList.remove('active');
                section.style.display = 'none';
            }
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', toggleSidebar);
    } else {
        console.error('Close button not found');
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            console.log('Clicked section:', sectionId);

            switchSection(sectionId);
            
            // Update active state in sidebar
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Initially show the dashboard
    switchSection('dashboard');
});