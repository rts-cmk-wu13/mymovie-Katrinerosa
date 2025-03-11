const url =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmIzNjM3NTc1MzI5ZWJlOGJhZGI4MzY0YjUzYjNmOSIsIm5iZiI6MTc0MDk5MzUyNy43LCJzdWIiOiI2N2M1NzNmN2RiMDUwODI0OGE3YTc1NzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBNCGQM-v95Io-w_Y_GaLddsrrL5s6W1tx5UwkwHP0k",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((playing) => {
    let nowPlayingContainer = document.querySelector("#now-showing");
    console.log(nowPlayingContainer);
    console.log(playing.results);
    let playingArray = playing.results;

    nowPlayingContainer.innerHTML += playingArray.map((movie) => {
      return `
        <article class="playing__movie">
            <div class="playing__img-container">
                <img class="playing__img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            </div>
        </article>
        `;
    });
  })
  .catch((err) => console.error(err));

//----------------------------------------popular fetch-------------------------------------------

const popularUrl =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

fetch(popularUrl, options)
  .then((res) => res.json())
  .then((playing) => {
    console.log(playing); //--->

    let nowPopularContainer = document.querySelector("#popular");

    if (!playing.results) {
      throw new Error("No results found in response");
    }

    let playingArray = playing.results;

    nowPopularContainer.innerHTML = playingArray
      .map((movie) => {
        return `
        <article class="popular__movie" data-id="${movie.id}">
          <div class="popular__img-container">
              <img class="popular__playing__img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          </div>
        </article>
      `;
      })
      .join(""); // `.join('')` sikrer korrekt HTML-indsættelse

    // 📌 Tilføj eventlistener til hver film
    document.querySelectorAll(".playing__movie").forEach((movieElement) => {
      movieElement.addEventListener("click", () => {
        const movieId = movieElement.getAttribute("data-id");
        window.location.href = `movie-detail.html?id=${movieId}`;
      });
    });
  })
  .catch((err) => console.error("Fejl ved popular fetch:", err));

//----------------------------------------image sizes fetch-------------------------------------------

const imagesUrl = "https://api.themoviedb.org/3/configuration";

fetch(imagesUrl, options)
  .then((res) => res.json())
  .then((json) => {
    const baseUrl = json.images.secure_base_url;
    const posterSize = json.images.poster_sizes[4]; // f.eks. "w500"

    console.log(`Base URL: ${baseUrl}, Poster size: ${posterSize}`);
  })
  .catch((err) => console.error(err));
