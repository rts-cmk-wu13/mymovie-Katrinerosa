fetch("https://api.themoviedb.org/3/trending/movie/week", {
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNmIzNjM3NTc1MzI5ZWJlOGJhZGI4MzY0YjUzYjNmOSIsIm5iZiI6MTc0MDk5MzUyNy43LCJzdWIiOiI2N2M1NzNmN2RiMDUwODI0OGE3YTc1NzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.RBNCGQM-v95Io-w_Y_GaLddsrrL5s6W1tx5UwkwHP0k"
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
