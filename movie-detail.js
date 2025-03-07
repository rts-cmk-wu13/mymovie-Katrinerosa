document.addEventListener("DOMContentLoaded", function () {
    let movie = JSON.parse(localStorage.getItem("selectedMovie"));

    if (!movie) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("detail-image").src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    document.getElementById("detail-title").textContent = movie.title;
    document.getElementById("detail-description").textContent = movie.overview;
    document.getElementById("detail-rating").textContent = `⭐ ${movie.vote_average.toFixed(1)} / 10`;

    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener("change", () => {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

function goBack() {
    window.history.back();
}
