let allPosts = [];

function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function buildBlogCard(post) {
    const card = document.createElement('a');
    card.className = 'blogCard';
    card.href = `post.html?id=${post.id}`;
    card.innerHTML = `
        <div class="post-card-inner">
            <div class="post-card-text">
                <p class="post-title">${post.title}</p>
                <p class="post-preview">${post.description}</p>
            </div>
            <p class="post-date">${formatDate(post.date)}</p>
        </div>
    `;
    return card;
}

function renderPosts(posts) {
    const container = document.getElementById('blogContainer');
    container.innerHTML = '';
    if (posts.length === 0) {
        container.innerHTML = '<p class="blog-empty">No posts match your search.</p>';
        return;
    }
    posts.forEach(post => container.appendChild(buildBlogCard(post)));
}

function handleSearch() {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) {
        renderPosts(allPosts);
        return;
    }
    const filtered = allPosts.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
    renderPosts(filtered);
}

async function loadBlogPage() {
    const container = document.getElementById('blogContainer');
    try {
        const listRes = await fetch('posts-list.json');
        const postIds = await listRes.json();

        for (const id of postIds) {
            try {
                const res = await fetch(`posts/${id}.json`);
                if (res.ok) allPosts.push(await res.json());
            } catch { /* skip */ }
        }

        allPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (allPosts.length === 0) {
            container.innerHTML = '<p class="blog-empty">No posts yet. Check back soon.</p>';
            return;
        }

        renderPosts(allPosts);

        document.getElementById('searchInput').addEventListener('input', handleSearch);
    } catch (err) {
        console.error('Failed to load blog posts:', err);
        container.innerHTML = '<p class="blog-empty">Failed to load posts.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadBlogPage);
