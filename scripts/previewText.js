// Function to get a truncated preview of the content based on screen size
function getPreview(content, mobile, desktop) {
    // Determine the character limit based on screen width
    const limit = window.innerWidth < 768 ? mobile : desktop;

    // If content length is less than or equal to the limit, return it as is
    if (content.length <= limit) {
        return content;
    }

    // Truncate the content to the specified limit
    let truncated = content.substring(0, limit);

    // Find the last space in the truncated content to avoid cutting words in half
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    // If there's a space, truncate content at the last full word
    if (lastSpaceIndex !== -1) {
        truncated = truncated.substring(0, lastSpaceIndex);
    }

    // Append '...' to indicate that the content has been truncated
    return truncated + '...';
}

// Function to format a date string into a readable format
function formatDate(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);

    // Define the formatting options (year, short month, and day)
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    // Return the formatted date as a string
    return date.toLocaleDateString('en-US', options);
}

// Fetch blog post data from the given URL
fetch('https://storytime-productions.github.io/blog/posts.json')
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Get the container element where blog posts will be displayed
        const blogContainer = document.getElementById('blogContainer');

        // Slice the first 3 posts to display
        const latestPosts = data.slice(0, 3);

        // Iterate through each post and create a blog card
        latestPosts.forEach(post => {
            // Set the HTML link for each post
            post.html = "https://storytime-productions.github.io/blog";

            // Create the blog card element for each post
            const card = document.createElement('div');
            card.classList.add('blogCard'); // Add a CSS class for styling

            // Create the inner HTML content for the card, including title, preview, and date
            const cardContent = `
                <div class="post-container">
                    <div class="post-title-content">
                        <p class="post-title">${post.title}</p>
                        <p class="post-preview">${getPreview(post.content, 30, 120)}</p> <!-- Display preview -->
                    </div>

                    <div class="post-date-readmore">
                        <div class="post-date-container">
                            <p class="post-date">${formatDate(post.date)}</p> <!-- Format the post date -->
                            <button class="read-more-btn" onclick="window.location.href='${post.html}?title=${encodeURIComponent(post.title)}'">Read More</button>
                        </div>
                    </div>
                </div>
            `;

            // Insert the card content into the card div
            card.innerHTML = cardContent;

            // Append the created card to the blog container
            blogContainer.appendChild(card);
        });

        // Add a "View All" button to the end of the posts
        const viewAllButton = document.createElement('a');
        viewAllButton.href = "https://storytime-productions.github.io/blog"; // Link to the full blog page
        viewAllButton.id = 'buttonContainer';
        viewAllButton.innerHTML = `
            <button class="view-posts-button">
                View All
            </button>
        `;

        // Append the "View All" button to the blog container
        blogContainer.appendChild(viewAllButton);
    })
    .catch(error => {
        // Log any errors that occur during the fetch request
        console.error('Error fetching blog posts:', error);
    });
