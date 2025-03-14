const API_KEY = "3021a3346474c349906d556b919dc393"; // --> ny v3 API-nøgle
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

//----<Funktion  hente og vise film
function fetchMovies(endpoint, containerId, imageClass) {
  fetch(`${API_URL}${endpoint}&api_key=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      const movieContainer = document.getElementById(containerId);
      if (!data.results || data.results.length === 0) {
        movieContainer.innerHTML = "<p>Ingen film fundet</p>";
        return;
      }

      movieContainer.innerHTML = data.results
        .map((movie) => {
          return `
            <article class="movie-card" data-id="${movie.id}">
                <div class="movie-img-container">
                    <img class="${imageClass}" src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}">
                </div>
            </article>
        `;
        })
        .join("");

      // ---->klik
      document.querySelectorAll(".movie-card").forEach((movieElement) => {
        movieElement.addEventListener("click", () => {
          const movieId = movieElement.getAttribute("data-id");
          window.location.href = `movie-detail.html?id=${movieId}`;
        });
      });
    })
    .catch((err) => console.error("Fejl ved hentning af film:", err));
}

//  ---> dark mode
document.addEventListener("DOMContentLoaded", function () {
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

//  H----> hente film
fetchMovies("/movie/now_playing?language=en-US&page=1", "now-showing", "playing__img");
fetchMovies("/movie/popular?language=en-US&page=1", "popular", "popular__playing__img");
