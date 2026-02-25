const API_KEY = "AIzaSyCRTfvbFUECavwHJpIreARP3RlDAKAMoeE";

const searchBox = document.getElementById("searchInput");
const suggestions = document.getElementById("suggestions");
const searchBtn = document.getElementById("searchBtn");

async function searchVideos(query) {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20&q=${encodeURIComponent(query)}&key=${API_KEY}`
        );
        const data = await response.json();

        let injectdHTML = "";
        data.items.forEach(video => {
            injectdHTML += `
            <div class="video-wrapper">
              <article class="video-card">
                <iframe width="100%" height="200"
                  src="https://www.youtube.com/embed/${video.id.videoId}" 
                  frameborder="0" allowfullscreen></iframe>
                <h3>${video.snippet.title}</h3>
                <p>${video.snippet.channelTitle}</p>
              </article>
            </div>
          `;
        });

        document.getElementById("videoInput").innerHTML = injectdHTML;
    } catch (error) {
        document.getElementById("videoInput").innerHTML = `<p>${error}</p>`;
    }
}

// ---Search Suggestion--- //

async function fetchSuggestions(query) {
    const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=5&q=${encodeURIComponent(query)}&key=${API_KEY}`
    );
    const data = await response.json();
    return data.items;
}

function renderSuggestions(items) {
    suggestions.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.snippet.title;

        li.addEventListener("click", () => {
            searchBox.value = item.snippet.title;
            searchVideos(item.snippet.title);
            suggestions.innerHTML = "";
        });

        suggestions.appendChild(li);
    });
}

searchBox.addEventListener("input", async (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
        const results = await fetchSuggestions(query);
        renderSuggestions(results);
    } else {
        suggestions.innerHTML = "";
    }
});

searchBtn.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (query) {
        searchVideos(query);
        suggestions.innerHTML = "";
    }
});


export {searchVideos}