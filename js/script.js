import peliculas from './peliculas.js'

// General values.
const action = 28;
const thriller = 53;
const adventure = 12;
const posterBasePath = 'https://image.tmdb.org/t/p/w500';

// Arrays to contain dom references.
const actionMovies = peliculas.filter((element) => element.genre_ids.find((element) => element === action));
const thrillerMovies = peliculas.filter((element) => element.genre_ids.find((element) => element === thriller));
const adventureMovies = peliculas.filter((element) => element.genre_ids.find((element) => element === adventure));

const moreInfoWindow = document.querySelector('.info_element');


// References to DOM.
const actionSection = document.getElementById('genero-28');
const thrillerSection = document.getElementById('genero-53');
const adventureSection = document.getElementById('genero-12');

// Insert the movies in the DOM.
actionMovies.forEach(element => {
    actionSection.insertAdjacentHTML('beforeend', 
    `<article class="movie_entry">
        <img class="movie_poster" src=${posterBasePath.concat(element.poster_path)} alt="tittle poster"/>
        <h3 class="movie_tittle">${element.title}</h3>
    </article>`);
});

thrillerMovies.forEach(element => {
    thrillerSection.insertAdjacentHTML('beforeend', 
    `<article class="movie_entry">
        <img class="movie_poster" src=${posterBasePath.concat(element.poster_path)} alt="tittle poster"/>
        <h3 class="movie_tittle">${element.title}</h3>
    </article>`);
});

adventureMovies.forEach(element => {
    adventureSection.insertAdjacentHTML('beforeend', 
    `<article class="movie_entry">
        <img class="movie_poster" src=${posterBasePath.concat(element.poster_path)} alt="tittle poster"/>
        <h3 class="movie_tittle">${element.title}</h3>
    </article>`);
});

// Function to set a litener to every movie entry. This will be activated once the mouse enters the movie zone, 
// and when mouse leaves the zone. The listener will pop a window to show more info about the movie.
const moreInfo = () => {
    const movieTittles = document.querySelectorAll('.movie_entry');

    movieTittles.forEach(movieTittle => {
        movieTittle.addEventListener('mouseenter', function(){
            this.appendChild(moreInfoWindow);

            const actualMovieTitle = movieTittle.textContent.trim();
            const actualMovie = peliculas.find((element) => element.title === actualMovieTitle);

            moreInfoWindow.innerHTML =
            `
            <ul class="movieInfo">
                <li class="movieInfo_entry"><span>Tittle:</span> ${actualMovie.title}</li>
                <li class="movieInfo_entry"><span>Release:</span> ${actualMovie.release_date}</li>
                <li class="movieInfo_entry"><span>Score:</span> ${actualMovie.vote_average}</li>
                <li class="movieInfo_entry"><span>Overview:</span> ${actualMovie.overview}</li>
            </ul>
            `;
            moreInfoWindow.style.display = 'flex';
        })

        movieTittle.addEventListener('mouseleave', function(){
            moreInfoWindow.innerHTML = "";
            this.removeChild(moreInfoWindow);
            moreInfoWindow.style.display = 'none';
        })
    })
}

moreInfo();