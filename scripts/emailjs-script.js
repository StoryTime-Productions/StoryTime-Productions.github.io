(function() {
    // Initialize emailjs with the provided public key for sending emails
    emailjs.init({
        publicKey: "xc4DBGpM-eNhx-ehW" // The public key for emailjs, used to identify your account
    });
})();

// This function runs when the window has fully loaded
window.onload = function() {
    // Add an event listener to the contact form to handle form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        // Prevent the default form submission behavior (which would reload the page)
        event.preventDefault();

        // Send the form data using emailjs
        emailjs.sendForm('service_o5s5zkf', 'template_7eagn0j', this)
            .then(() => {
                // Success callback: If the email is successfully sent
                console.log('SUCCESS!'); // Log success to the console

                // Reset the form to clear the input fields
                this.reset();
            }, (error) => {
                // Failure callback: If the email fails to send
                console.log('FAILED...', error); // Log the error to the console
            });
    });
};
