// Loads the 2 most recent blog posts and renders preview cards in #blogContainer on the main page.

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function getPreview(text, mobileLimit = 100, desktopLimit = 180) {
    const limit = window.innerWidth < 768 ? mobileLimit : desktopLimit;
    if (text.length <= limit) return text;
    const truncated = text.substring(0, text.lastIndexOf(' ', limit));
    return (truncated || text.substring(0, limit)) + '...';
}

async function loadBlogPreviews() {
    const container = document.getElementById('blogContainer');
    if (!container) return;

    try {
        const listRes = await fetch('./blog/posts-list.json');
        const postIds = await listRes.json();

        const posts = [];
        for (const id of postIds) {
            try {
                const res = await fetch(`./blog/posts/${id}.json`);
                if (res.ok) posts.push(await res.json());
            } catch { /* skip */ }
        }

        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
        const preview = posts.slice(0, 2);

        // Remove placeholder anchor, keep it
        const anchor = container.querySelector('.anchorContainer');

        preview.forEach(post => {
            const card = document.createElement('div');
            card.className = 'blogCard';
            card.innerHTML = `
                <div class="post-container">
                    <div class="post-title-content">
                        <p class="post-title">${post.title}</p>
                        <p class="post-preview">${getPreview(post.description)}</p>
                    </div>
                    <div class="post-date-readmore">
                        <div class="post-date-container">
                            <p class="post-date">${formatDate(post.date)}</p>
                        </div>
                        <a href="./blog/post.html?id=${post.id}">
                            <button class="read-more-btn">Read More &rarr;</button>
                        </a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        // View all posts button
        const btnWrap = document.createElement('div');
        btnWrap.id = 'buttonContainer';
        btnWrap.innerHTML = `<a href="./blog/index.html"><button class="view-posts-button">View All Posts &rarr;</button></a>`;
        container.appendChild(btnWrap);

    } catch (err) {
        console.error('Failed to load blog previews:', err);
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPreviews);
