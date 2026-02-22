import { renderYTVids } from "./video-collection.mjs";
import { searchVideos } from "./search.mjs";

renderYTVids();

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        searchVideos(query);
    }
});


searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query) {
            searchVideos(query);
        }
    }
});
