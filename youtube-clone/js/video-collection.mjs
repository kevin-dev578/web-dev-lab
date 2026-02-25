const API_KEY = "AIzaSyCRTfvbFUECavwHJpIreARP3RlDAKAMoeE";
const BASE_URL = "https://www.googleapis.com/youtube/v3/videos";

let videoData = [];      
let currentIndex = 0;    
const batchSize = 12;     

async function renderYTVids() {
    const spinner = document.getElementById("spinner");
    spinner.style.display = "block";

    try {
        const response = await fetch(
            `${BASE_URL}?part=snippet&chart=mostPopular&maxResults=50&regionCode=US&key=${API_KEY}`
        );
        const data = await response.json();
        videoData = data.items
        renderBatch();

        const showMore = document.getElementById("showMoreVid");
        showMore.addEventListener("click", () => {
            spinner.style.display = "block";
            setTimeout(() => {
                renderBatch(); 
            }, 1000);
        });

    } catch (error) {
        const div = document.getElementById("videoInput");
        div.innerHTML = `<p>${error}</p>`;
    }
}

function renderBatch() {
    const div = document.getElementById("videoInput");
    let injectdHTML = "";

    // slice the next batch
    const slicedVideo = videoData.slice(currentIndex, currentIndex + batchSize);

    slicedVideo.forEach(video => {
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

  
    div.insertAdjacentHTML("beforeend", injectdHTML); // beforeend goes to the end of the index and append videos there, and injectshtml there

    currentIndex += batchSize;

    // hide button once all videos are shown
    if (currentIndex >= videoData.length) {
        document.getElementById("showMoreVid").style.display = "none";
        const spinner = document.getElementById("spinner");
    }

   
    const spinner = document.getElementById("spinner");
    spinner.style.display = "none";
}

export { renderYTVids };
