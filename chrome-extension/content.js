let savedPosition = null;
let savedVideoId = null;

document.addEventListener("keydown", (event) => {
    const video = document.querySelector("video");

    if (!video) return;

    const currentVideoId = new URLSearchParams(window.location.search).get("v");

    if (event.altKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        savedPosition = Math.max(0, video.currentTime - 5);
        savedVideoId = currentVideoId;

        video.pause();

        console.log("Position saved:", savedPosition);
        console.log("Video ID:", savedVideoId);
    }
    else if (event.altKey && event.key.toLowerCase() === "q") {
        event.preventDefault();
        if (savedPosition !== null && currentVideoId === savedVideoId) {
            video.currentTime = savedPosition;

            console.log("Returned to:", savedPosition);
        }
        else {
            console.log("No saved position for this video.");
        }
    }
});