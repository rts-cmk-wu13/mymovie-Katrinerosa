document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("id");

    if (!movieId || movieId === "null") {
        console.error("Ugyldigt film ID:", movieId);
        window.location.href = "index.html";
        return;
    }

    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmIzNjM3NTc1MzI5ZWJlOGJhZGI4MzY0YjUzYjNmOSIsIm5iZiI6MTc0MDk5MzUyNy43LCJzdWIiOiI2N2M1NzNmN2RiMDUwODI0OGE3YTc1NzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBNCGQM-v95Io-w_Y_GaLddsrrL5s6W1tx5UwkwHP0k"
        }
    };

    fetch(movieDetailsUrl, options)
        .then(res => res.json())
        .then(movie => {
            console.log("Film data:", movie);   
            console.log(`Billed-URL: https://image.tmdb.org/t/p/w500${movie.poster_path}`);


            if (!movie || !movie.poster_path) {
                console.error("Fejl: Ingen filmdata fundet");
                return;
            }

            document.getElementById("detail-image").src = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "fallback-image.jpg"; 

            document.getElementById("detail-title").textContent = movie.title;
            document.getElementById("detail-description").textContent = movie.overview || "Ingen beskrivelse tilgængelig.";
            document.getElementById("detail-rating").textContent = `⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"} / 10`;
            document.getElementById("detail-image").classList.add("loaded");

            
        })
        .catch(err => console.error("Fejl ved hentning af film detaljer:", err));

    // Dark Mode
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
