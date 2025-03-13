const API_KEY = "3021a3346474c349906d556b919dc393"; // Skift til din gyldige API-nøgle
const API_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// ----> Funktion til at hente film-id fra URL'en
function getMovieIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id"); // Henter "id" fra URL'en
}

//  ---> filmens detaljer
function fetchMovieDetails(movieId) {
  if (!movieId) {
    console.error(" Ingen film-id fundet i URL");
    return;
  }

  fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API-fejl: ${response.status}`);
      }
      return response.json();
    })
    .then((movie) => {
      console.log("Film Detaljer:", movie);

      document.getElementById("detail-title").textContent = movie.title;
      document.getElementById("detail-description").textContent = movie.overview;
      document.getElementById("detail-rating").textContent = `⭐ ${movie.vote_average.toFixed(1)} / 10`;

      const imageElement = document.getElementById("detail-image");
      imageElement.src = movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : "fallback-image.jpg";
      imageElement.alt = movie.title;

      //  Vis genre
      document.getElementById("detail-genres").textContent = movie.genres.map(genre => genre.name).join(", ");

      // Hent skuespillere
      fetchMovieCast(movieId);
    })
    .catch((error) => {
      console.error(" Fejl ved hentning af film detaljer:", error);
    });
}

// Funktion til at hente skuespillere (cast)
function fetchMovieCast(movieId) {
  fetch(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
    .then((response) => response.json())
    .then((data) => {
      console.log("🌟 Skuespillere:", data.cast);
      const castContainer = document.getElementById("detail-cast");
      castContainer.innerHTML = ""; // Ryd tidligere indhold

      data.cast.slice(0, 6).forEach(actor => {
        const actorElement = document.createElement("div");
        actorElement.classList.add("actor");

        actorElement.innerHTML = `
          <img src="${actor.profile_path ? IMAGE_BASE_URL + actor.profile_path : 'fallback-image.jpg'}" alt="${actor.name}">
          <p>${actor.name}</p>
        `;

        castContainer.appendChild(actorElement);
      });
    })
    .catch(error => console.error(" Fejl ved hentning af cast:", error));
}

//  Funktion til tilbage-knap
function goBack() {
  history.back();
}

// Dark Mode håndtering
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

// Start filmhentning
const movieId = getMovieIdFromUrl();
fetchMovieDetails(movieId);
