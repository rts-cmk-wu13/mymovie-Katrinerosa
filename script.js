import API_KEY from "./config.js";

let currentPage = 1;
let isFetching = false;

/* 🎥 Funktion til at hente film fra API */
function fetchMovies(endpoint, containerId, append = false) {
  if (isFetching) return;
  isFetching = true;

  fetch(`https://api.themoviedb.org/3/${endpoint}?page=${currentPage}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Hentet film fra ${endpoint}:`, data);

      let container = document.getElementById(containerId);

      if (!append) {
        container.innerHTML = ""; // Rens kun ved første load
      }

      data.results.forEach((movie) => {
        let movieElement = document.createElement("div");
        movieElement.classList.add("movie-card");

        movieElement.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${
                  movie.poster_path
                }" alt="${movie.title}">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>
                <p>🗓 ${movie.release_date}</p>
            `;

        container.appendChild(movieElement);
      });

      isFetching = false;
    })
    .catch((error) => {
      console.error("Fejl ved hentning:", error);
      isFetching = false;
    });
}

// 🎬 Loader film fra begge API'er
fetchMovies("movie/now_playing", "now-showing"); 
fetchMovies("movie/popular", "popular"); 

// 🔄 **Infinite Scroll - Læsser flere "popular" film**
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
    !isFetching
  ) {
    currentPage++;
    fetchMovies("movie/popular", "popular", true);
  }
});

// 🎬 Load More-knap (fallback)
document.getElementById("load-more").addEventListener("click", () => {
    currentPage++;
    fetchMovies("movie/popular", "popular", true);
});

// 🌓 **DARK MODE TOGGLE**
const darkModeToggle = document.getElementById("dark-mode-toggle");

// **Tjek om Dark Mode er aktiveret**
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.checked = true;
}

// **Event listener for at skifte Dark Mode**
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
});
