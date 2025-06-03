// Mobile Side Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-side-menu');
    const closeBtn = document.getElementById('mobile-menu-close');
    const menuLinks = document.querySelectorAll('#mobile-side-menu nav ul li a');
    
    // Open menu when hamburger button is clicked
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        mobileMenu.classList.add('open');
        document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    // Close menu when X button is clicked
    closeBtn.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close menu when clicking a link
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // If it's a hash link (section on same page), scroll to it
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }, 300);
                }
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('open') && 
            !mobileMenu.contains(e.target) && 
            e.target !== mobileMenuBtn && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        }
    });
    
    // Prevent clicks inside menu from closing it
    mobileMenu.addEventListener('click', function(e) {
        e.stopPropagation();
    });
}); 