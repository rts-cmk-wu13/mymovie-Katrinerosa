import API_KEY from "./config.js";

fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
})
.then(response => response.json())
.then(data => {
    console.log(data); // Debugging

    let movieContainer = document.querySelector("#movies"); // Find container i HTML

    data.results.forEach(movie => {
        let movieElement = document.createElement("div");
        movieElement.classList.add("movie-card"); // CSS-klasse

        movieElement.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>⭐ ${movie.vote_average} / 10</p>
            <p>${movie.release_date}</p>
        `;

        movieContainer.appendChild(movieElement);
    });
})
.catch(error => console.error("Fejl ved hentning:", error));
