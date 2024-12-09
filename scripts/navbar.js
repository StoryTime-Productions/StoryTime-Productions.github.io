// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
    // Select all navigation links and anchors in the document
    const navLinks = document.querySelectorAll(".nav-link");
    const anchors = document.querySelectorAll("a.anchor"); // Get all anchors with the class 'anchor'
    // Map the anchors to their closest div sections
    const sections = Array.from(anchors).map(anchor => anchor.closest("div")); // Get closest div to the anchor, assuming div contains the section

    // Options for the IntersectionObserver
    const observerOptions = {
        root: null, // Use the viewport as the root
        threshold: 0.5, // Trigger when 50% of the section is visible
    };

    // Callback for the IntersectionObserver
    const observerCallback = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the active anchor's name (from the 'name' attribute)
                const activeAnchorName = entry.target.querySelector("a.anchor").getAttribute("name");

                // Update the nav link styles based on which section is visible
                navLinks.forEach((link) => {
                    if (link.getAttribute("href") === `#${activeAnchorName}`) {
                        // Add 'active' class to the nav link for the currently visible section
                        link.classList.add("active");
                    } else {
                        // Remove 'active' class from other nav links
                        link.classList.remove("active");
                    }
                });
            }
        });
    };

    // Create a new IntersectionObserver instance with the callback and options
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe each section
    sections.forEach((section) => {
        observer.observe(section); // Start observing the section
    });
    
});

// Function to handle clicks outside the navbar
function handleOutsideClick(event) {
    const toggleNavbarButton = document.getElementById('toggleNavbarButton');
    const navbar = document.getElementById('navbar-default');
    
    if (!navbar.contains(event.target) && !toggleNavbarButton.contains(event.target)) {
        toggleNavbar();
    }
}

// Function to toggle the navbar visibility (fade in/out and slide)
function toggleNavbar() {
    const navbar = document.getElementById('navbar-default');

    // Check if the navbar is currently hidden
    if (navbar.classList.contains('hidden')) {
        // Prepare for fade in by setting initial styles
        navbar.style.display = 'block';
        navbar.style.opacity = '0';
        navbar.style.transform = 'translateY(-20px)';
        navbar.style.maxHeight = '0';

        // Trigger a reflow to ensure the styles are applied
        navbar.offsetHeight;

        // Fade, slide, and expand in by updating the styles
        navbar.classList.remove('hidden');
        setTimeout(() => {
            navbar.style.opacity = '1'; // Fade in
            navbar.style.transform = 'translateY(0)'; // Slide in
            navbar.style.maxHeight = '500px'; // Expand in (should match the CSS max-height value)
        }, 10); // Apply the changes shortly after removing 'hidden' class

        document.addEventListener('click', handleOutsideClick);
    } else {
        // Fade, slide, and collapse out by resetting styles
        navbar.classList.add('hidden');
        navbar.style.opacity = '0'; // Fade out
        navbar.style.transform = 'translateY(-20px)'; // Slide out
        navbar.style.maxHeight = '0'; // Collapse height

        // After the transition, hide the navbar completely
        setTimeout(() => {
            navbar.style.display = 'none'; // Hide the navbar element after animation
        }, 300); // Wait for the transition to complete before hiding

        document.removeEventListener('click', handleOutsideClick);
    }
}