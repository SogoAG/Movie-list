// Movie class : represent a movie

class Movie {
    constructor(title, genre) {
        this.title = title;
        this.genre = genre;
    }
}

// UI Class : Handle UI Tasks
class UI {
    static displayMovie() {
        //Dummy Data
        // const storedMovie = [
        //     {
        //         title: 'Gravity',
        //         genre: 'Sci-fi'
        //     },
        //     {
        //         title: 'Wakanda Forever',
        //         genre: 'Action'
        //     }
        // ];

        const movies = Store.getMovie();

        // loop through it with forEach
        movies.forEach((movie) => UI.addMovieToList(movie));
    }

    static addMovieToList(movie) {
        const list = document.querySelector('#movie-list')

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${movie.title}</td>
        <td>${movie.genre}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }


    static deleteMovie(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#movie-form');
        container.insertBefore(div, form);
        // Vanish in 2.5 Seconds
        setTimeout(()  => document.querySelector('.alert').remove(), 2500)
      }
    
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#genre').value = '';
    }
}


// Store Class: Handles Storage
class Store {

    static getMovie(){
        let movies;
        if (localStorage.getItem('movies') === null) {
            movies = [];
        } else {
            movies = JSON.parse(localStorage.getItem('movies'));
        }

        return movies;
    }

    static addMovie(movie){
            const movies = Store.getMovie();
            movies.push(movie);
            localStorage.setItem('movies', JSON.stringify(movies));

    }

    static removeMovie(title){
            const movies = Store.getMovie();

            movies.forEach((movie, String) => {
                if (movie.title === title) {
                    movies.splice(String, 1)
                }
            });
            localStorage.setItem('movies', JSON.stringify(movies));
    }
}


// Event: Display Movies
document.addEventListener('DOMContentLoaded', UI.displayMovie);


// Event: Add Movie
document.querySelector('#movie-form').addEventListener('submit', (e) => {

    // Prevent Actual Submit
    e.preventDefault();

    // Get form Values
    const title = document.querySelector('#title').value;
    const genre = document.querySelector('#genre').value;

    // Validate
    if (title === '' || genre === '') {
        UI.showAlert('Hey are you forgetting something ? :)', 'danger');
    } else {
        // Instatiate a movie
        const movie = new Movie(title, genre);

        // Add Movie to UI
        UI.addMovieToList(movie);

        // Add Movie to store
        Store.addMovie(movie);

         // Show Success message
      UI.showAlert('Movie Added Yayy (:', 'success');


        // Clear fields
        UI.clearFields();
    }

});


// Event: Remove Movie
document.querySelector('#movie-list').addEventListener('click', (e) => {
    // Remove Movie From UI
    UI.deleteMovie(e.target);

    // remove movie From store
    Store.removeMovie(e.target.parentElement.parentElement.firstElementChild.textContent);

     // Show info message
  UI.showAlert('Movie Removed :(', 'success')
})