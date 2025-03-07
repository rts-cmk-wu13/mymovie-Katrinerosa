import API_KEY from "./config.js";

let currentPage = 1;
let isFetching = false;

function fetchMovies(endpoint, callback, append = false) {
  //if (isFetching) return;
  isFetching = true;

  fetch(`https://api.themoviedb.org/3/${endpoint}?page=${currentPage}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (!data.results) return;
      callback(data.results, append);
      isFetching = false;
    })
    .catch(() => {
      isFetching = false;
    });
}

function createMovieElement(movie) {
  let movieElement = document.createElement("div");
  movieElement.classList.add("movie-card");

  movieElement.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average.toFixed(1)} / 10</p>
        <p>🗓 ${movie.release_date}</p>
    `;

  movieElement.addEventListener("click", () => showMovieDetails(movie));

  return movieElement;
}

function showMovieDetails(movie) {
  localStorage.setItem("selectedMovie", JSON.stringify(movie));
  window.location.href = "movie-detail.html";
}

fetchMovies("movie/now_playing", (movies) => {
    console.log('playing: ', movies);
    
  let nowShowingContainer = document.getElementById("now-showing");
  movies.forEach((movie) =>
    nowShowingContainer.appendChild(createMovieElement(movie))
  );
});

fetchMovies("movie/popular", (movies) => {

    console.log(movies);
    
  let popularContainer = document.getElementById("popular");
  movies.forEach((movie) =>
    popularContainer.appendChild(createMovieElement(movie))
  );
});

window.addEventListener("scroll", function () {
  let popularContainer = document.getElementById("popular");
  let body = document.body;

  console.log(body.scrollTop, body.scrollHeight);
  

  if (
    body.scrollTop >= body.scrollHeight - 0 && !isFetching
  ) {
    currentPage++;
    fetchMovies(
      "movie/popular",
      (movies) => {
        movies.forEach((movie) =>
          popularContainer.appendChild(createMovieElement(movie))
        );
      },
      true
    );
  }
});
