// Toggle between the front and back of a card
function toggleCard(button) {
    const card = button.closest('.itemContainer');
    const cardFront = card.querySelector('.cardFront');
    const cardBack = card.querySelector('.cardBack');

    if (cardBack.style.visibility === 'visible') {
        cardBack.style.visibility = 'hidden';
        cardBack.style.display = 'none';
        cardFront.style.display = 'block';
        cardFront.style.visibility = 'visible';
    } else {
        cardBack.style.visibility = 'visible';
        cardFront.style.visibility = 'hidden';
        cardFront.style.display = 'none';
        cardBack.style.display = 'block';
    }
}

// Build a single carousel item from a game data object
function buildGameItem(game) {
    const logoHTML = game.logos
        ? game.logos.map(l => `<img src="${l.src}" alt="Logo" class="${l.class}">`).join('\n                     ')
        : `<img src="${game.logo}" alt="Logo" class="gameLogo">`;

    const stillHTML = game.stills
        ? `<div class="cyclingStillsContainer">${game.stills.map((s, i) => `<img src="${s}" alt="Still" class="${game.stillClass}${i === 0 ? ' cycling-active' : ''}">`).join('')}</div>`
        : `<img src="${game.still}" alt="GIF" class="${game.stillClass}">`;

    const badgesHTML = game.badges
        .map(b => `<span class="badge">${b}</span>`)
        .join('\n                              ');

    const actionHTML = game.comingSoon
        ? `<span class="comingSoonBadge">Coming Soon</span>`
        : `<a href="${game.downloadUrl}" target="_blank" class="downloadButton">${game.downloadLabel}</a>`;

    return `
                  <div class="itemContainer" data-carousel-item>
                     <div class="cardFront">
                        <div class="anchorContainer">
                           ${stillHTML}
                        </div>
                        <div class="logoContainer">
                           <div class="imageContainer">
                              ${logoHTML}
                           </div>
                           <button class="showDetailsButton" onclick="toggleCard(this)">View Details</button>
                        </div>
                     </div>
                     <div class="cardBack">
                        <button class="closeBackCardButton" onclick="toggleCard(this)">X</button>
                        <p class="description">${game.description}</p>
                        <div class="bottomContainer">
                           <p class="releaseDate">Release Date: ${game.releaseDate}</p>
                           <div class="badgeContainer">
                              ${badgesHTML}
                           </div>
                           <div class="bottomButtonsContainer">
                              <a href="${game.githubUrl}" target="_blank" class="githubButton">
                                 <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="GitHub" class="githubImage">
                              </a>
                              ${actionHTML}
                           </div>
                        </div>
                     </div>
                  </div>`;
}

// Build carousel dot indicators and arrow controls
function buildControls(count) {
    const dots = Array.from({ length: count }, (_, i) => `
                     <button type="button" class="ellipse" aria-current="${i === 0 ? 'true' : 'false'}" aria-label="Slide ${i + 1}" data-carousel-slide-to="${i}"></button>`).join('');

    return `
                  <div id="portfolioControls">
                     ${dots}
                     <button id="back" type="button" data-carousel-prev>
                        <span class="arrowContainer">
                           <svg class="arrowButton" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                           </svg>
                           <span class="sr-only">Previous</span>
                        </span>
                     </button>
                     <button id="go" type="button" data-carousel-next>
                        <span class="arrowContainer">
                           <svg class="arrowButton" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                           </svg>
                           <span class="sr-only">Next</span>
                        </span>
                     </button>
                  </div>`;
}

// Fetch games.json and render the carousel
async function loadGames() {
    try {
        const response = await fetch('./games.json');
        const { games } = await response.json();
        const wrapper = document.getElementById('carouselWrapper');

        wrapper.innerHTML = games.map(buildGameItem).join('') + buildControls(games.length);

        // Re-initialize only the carousel (avoids Flowbite Drawer detectStore bug)
        if (typeof initCarousels === 'function') {
            initCarousels();
        } else if (typeof initFlowbite === 'function') {
            initFlowbite();
        }

        initCyclingStills();
    } catch (err) {
        console.error('Failed to load games.json:', err);
    }
}

// Cycle through images in any .cyclingStillsContainer
function initCyclingStills() {
    document.querySelectorAll('.cyclingStillsContainer').forEach(container => {
        const imgs = container.querySelectorAll('img');
        if (imgs.length <= 1) return;
        let current = 0;
        setInterval(() => {
            imgs[current].classList.remove('cycling-active');
            current = (current + 1) % imgs.length;
            imgs[current].classList.add('cycling-active');
        }, 2500);
    });
}

document.addEventListener('DOMContentLoaded', loadGames);
