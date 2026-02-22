const API_KEY = "AIzaSyCRTfvbFUECavwHJpIreARP3RlDAKAMoeE";

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

// attach event listeners
document.getElementById("searchBtn").addEventListener("click", () => {
    const query = document.getElementById("searchInput").value.trim();
    if (query) 
        searchVideos(query);
});

document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = e.target.value.trim();
        if (query) 
            searchVideos(query);
    }
});

export { searchVideos };
