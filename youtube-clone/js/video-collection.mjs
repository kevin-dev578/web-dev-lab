const API_KEY = "AIzaSyCRTfvbFUECavwHJpIreARP3RlDAKAMoeE";
const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

async function renderYTVids() {

    try {
        const response = await fetch(
            `${BASE_URL}?part=snippet&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`
        );
        const data = await response.json();

        console.log(response);

        let injectdHTML = "";

        data.items.forEach(video => {
            injectdHTML += ` 
            <div class="video-wrapper">
            <article class="video-card">
                <iframe width="100%" height="200"
                src="https://www.youtube.com/embed/${video.id}" 
                frameborder="0" allowfullscreen></iframe>
                <h3>${video.snippet.title}</h3> 
                <p>${video.snippet.channelTitle}</p> 
            </article>
            </div>
            `;
        });

        // ✅ inject directly into the grid container
        const div = document.getElementById("videoInput");
        div.innerHTML = injectdHTML;


    } catch (error) {
        const div = document.getElementById("videoInput");
        const section = document.createElement("section");

        section.innerHTML = `<p>${error}</p>`;
        div.appendChild(section);
    }

}

export {renderYTVids};