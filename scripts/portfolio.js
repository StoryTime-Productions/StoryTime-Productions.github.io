// Function to toggle between the front and back of a card when a button is clicked
function toggleCard(button) {
    // Get the closest container (e.g., item) that holds the card
    const card = button.closest('.itemContainer');
    
    // Get the front and back elements of the card
    const cardFront = card.querySelector('.cardFront');
    const cardBack = card.querySelector('.cardBack');

    // Check if the card back is currently visible
    if (cardBack.style.visibility === 'visible') {
        // If the card back is visible, hide it and show the card front
        cardBack.style.visibility = 'hidden'; // Hide the back of the card
        cardBack.style.display = 'none'; // Make sure it's not taking up space
        cardFront.style.display = 'block'; // Show the front of the card
        cardFront.style.visibility = 'visible'; // Ensure the front is visible
    } else {
        // If the card back is not visible, show it and hide the front
        cardBack.style.visibility = 'visible'; // Make the back of the card visible
        cardFront.style.visibility = 'hidden'; // Hide the front of the card
        cardFront.style.display = 'none'; // Make sure the front doesn't take up space
        cardBack.style.display = 'block'; // Show the back of the card
    }
}
