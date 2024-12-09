// Select all elements with the class 'card'
const cards = document.querySelectorAll('.card');

// Iterate over each card element
cards.forEach(card => {
    
    // Function to handle hover movement and apply 3D rotation
    const handleHover = (x, y, rect) => {
        // Calculate the rotation on the X-axis based on the Y position of the cursor
        const rotateX = ((y / rect.height) - 0.5) * 20;
        // Calculate the rotation on the Y-axis based on the X position of the cursor
        const rotateY = ((x / rect.width) - 0.5) * -20;

        // Animate the card's rotation using GSAP with ease and perspective for 3D effect
        gsap.to(card, {
            duration: 0.3, // Duration of the animation (0.3 seconds)
            rotateX: rotateX, // Apply the calculated X rotation
            rotateY: rotateY, // Apply the calculated Y rotation
            transformPerspective: 1000, // Add perspective for the 3D effect
            ease: "power2.out" // Easing function for a smooth animation
        });
    };

    // Mousemove event listener - triggered when the mouse moves over the card
    card.addEventListener('mousemove', (e) => {
        // Get the dimensions of the card element (bounding box)
        const rect = card.getBoundingClientRect();
        // Calculate the X and Y position of the cursor relative to the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Call the handleHover function to apply rotation based on mouse position
        handleHover(x, y, rect);
    });

    // Mouseleave event listener - triggered when the mouse leaves the card
    card.addEventListener('mouseleave', () => {
        // Reset the card's rotation back to its original state with a smooth "elastic" effect
        gsap.to(card, {
            duration: 0.5, // Animation duration (0.5 seconds)
            rotateX: 0, // Reset X rotation
            rotateY: 0, // Reset Y rotation
            ease: "elastic.out(1, 0.3)" // Elastic easing for a bouncy reset effect
        });
    });

    // Touchstart event listener - triggered when a touch is initiated on a mobile device
    card.addEventListener('touchstart', (e) => {
        // Prevent the default touch behavior (such as scrolling or zooming)
        e.preventDefault();
    });

    // Touchmove event listener - triggered when a touch moves on the card on a mobile device
    card.addEventListener('touchmove', (e) => {
        // Get the touch position (first touch in the event)
        const touch = e.touches[0];
        // Get the dimensions of the card element
        const rect = card.getBoundingClientRect();
        // Calculate the X and Y position of the touch relative to the card
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        // Call the handleHover function to apply rotation based on touch position
        handleHover(x, y, rect);
    });

    // Touchend event listener - triggered when the touch ends on the card
    card.addEventListener('touchend', () => {
        // Reset the card's rotation back to its original state with a smooth "elastic" effect
        gsap.to(card, {
            duration: 0.5, // Animation duration (0.5 seconds)
            rotateX: 0, // Reset X rotation
            rotateY: 0, // Reset Y rotation
            ease: "elastic.out(1, 0.3)" // Elastic easing for a bouncy reset effect
        });
    });
});
