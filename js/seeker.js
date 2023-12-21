import songsAvailable from './songsObjets.js';
import player from './player.js';

let resultsContainer = document.getElementById('resultsContainer');
let seekerInput = document.getElementById('seekerInput');

function searchSong(value, container) {
    // Filtrar los resultados basados en el valor de búsqueda
    const searchResults = songsAvailable.filter(song => {
        return song.name.toLowerCase().includes(value.toLowerCase()) ||
               song.artist.toLowerCase().includes(value.toLowerCase()) ||
               song.album.toLowerCase().includes(value.toLowerCase());
    });

    // Mostrar los resultados en el contenedor
    if (value === "") {
        container.style.display = 'none';
    } else if (searchResults.length > 0) {
        container.style.display = 'flex';
        container.innerHTML = searchResults.map((song, index) => `
            <div class="result">
                <img src="${song.cover}" alt="cover" class="result__cover">
                <div class="result__info">
                    <h3 class="result__info-name">${song.name}</h3>
                    <p class="result__info-artist">${song.artist}</p>
                </div>
                <img src="/src/images/icons/play.svg" alt="play" class="result__btn" data-index="${song.id}">
            </div>`
            ).join('');
            container.style.borderRadius = '1rem 0 0 1rem';

        // Agregar eventos click a los elementos con la clase result__btn
        document.querySelectorAll('.result__btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Obtener la posición del elemento en searchResults usando el atributo data-index
                const position = parseInt(btn.getAttribute('data-index'), 10);
                // Llamar a la función player con la posición como argumento
                player(position, 'play');
                container.style.display = 'none';
                seekerInput.value = '';
            });
        });
    } else {
        container.innerHTML = `<h2 class="searchResultsContainer--h2">No hay resultados para "<span class="searchResultsContainer--span">${value}</span>" 😟</h2>`;
        container.style.display = 'flex';
        container.style.borderRadius = '1rem';
    }
}

seekerInput.addEventListener('input', () => {
    searchSong(seekerInput.value, resultsContainer);
});