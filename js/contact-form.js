// Simple contact form handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const sendingMessage = document.getElementById('sending-message');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Show sending message and hide others
            sendingMessage.style.display = 'block';
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Disable submit button to prevent multiple submissions
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // FormSubmit will handle the actual form submission
            // We don't prevent default form submission
            
            // Add a delay to show the sending message before form redirects
            setTimeout(function() {
                // FormSubmit typically redirects automatically, but in case it doesn't
                sendingMessage.style.display = 'none';
                successMessage.style.display = 'block';
                
                // Store success in sessionStorage to show on thanks page
                sessionStorage.setItem('formSubmitted', 'true');
            }, 1000);
        });
    }

    // Handle form errors
    window.addEventListener('error', function(e) {
        if (e.target.tagName === 'FORM') {
            if (sendingMessage) sendingMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'block';
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }
        }
    }, true);

    // Check if coming back from thanks page
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('submitted') && urlParams.get('submitted') === 'true') {
        if (successMessage) successMessage.style.display = 'block';
        window.history.replaceState({}, document.title, window.location.pathname);
    }
});

// For thanks.html page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThanksPage);
} else {
    initThanksPage();
}

function initThanksPage() {
    if (window.location.pathname.includes('thanks.html')) {
        // Set a flag that the form was successfully submitted
        sessionStorage.setItem('formSubmitted', 'true');
        
        // Add countdown for redirect back to home
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            let seconds = 5;
            countdownElement.textContent = seconds;
            
            const interval = setInterval(() => {
                seconds--;
                countdownElement.textContent = seconds;
                
                if (seconds <= 0) {
                    clearInterval(interval);
                    window.location.href = 'index.html?submitted=true';
                }
            }, 1000);
            
            // Allow to cancel redirect
            document.addEventListener('click', function() {
                clearInterval(interval);
                const redirectMsg = document.querySelector('.redirect-message');
                if (redirectMsg) {
                    redirectMsg.textContent = 'Auto-redirect cancelled. Use the button below to return home.';
                }
            });
        }
    }
} 