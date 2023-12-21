import {songsAvailable} from './songsObjets.js';
import player from './player.js';
const artists = [
    {
        name: 'Lil Peep',
        photo: '/src/images/artist/lil_peep.webp',
        songs: [songsAvailable[0], songsAvailable[23], songsAvailable[41]]
    },

    {
        name: 'José Madero',
        photo: '/src/images/artist/jose_madero.webp',
        songs: [songsAvailable[13], songsAvailable[14], songsAvailable[15], songsAvailable[16]]
    },

    {
        name: 'XXXTENTACION',
        photo: '/src/images/artist/xxxtentacion.webp',
        songs: [songsAvailable[2], songsAvailable[24], songsAvailable[40]]
    },

    {
        name: 'Juice WRLD',
        photo: '/src/images/artist/juice-wrld.webp',
        songs: [songsAvailable[33], songsAvailable[38], songsAvailable[39]]
    }
];

function showArtist(container, artistName) {
    const modal = document.getElementById(`${container}`);
    const artistInQuestion = artists.find(artistObj => artistObj.name === artistName);

    modal.style.display = 'flex';
    modal.innerHTML = `<div class="artistModal">
        <img src="/src/images/icons/closeIcon.svg" alt="close" class="artistModal__close" id='closeModal${artistInQuestion.name}'>
        <div class="artistModal__info">
            <img src="${artistInQuestion.photo}" alt="Artist" class="artistModal__info-img">
            <h2 class="artistModal__info-name">${artistInQuestion.name}</h2>
        </div>
        <h2 class="artistModal__songs">Canciones top</h2>
        <ul class="artistModal__ul"></ul>
    </div>`;

    const ulElement = modal.querySelector('.artistModal__ul');

    artistInQuestion.songs.forEach(song => {
        const liElement = document.createElement('li');
        liElement.classList.add('artistModal__li');
        liElement.innerHTML = `
            <div class="song__info">
                <img src="${song.cover}" alt="Song cover" class="artistModal__li--img">
                <span>
                    <h3 class="artistModal__li--songName">${song.name}</h3>
                    <p class="artistModal__li--artist">${artistInQuestion.name}</p>
                </span>
            </div>
            <img src="/src/images/icons/play.svg" alt="play" class="artistModal__li--btn" data-index="${song.id}">
        `;

        ulElement.appendChild(liElement);

        const closeModal = document.getElementById(`closeModal${artistInQuestion.name}`);

        closeModal.addEventListener('click', ()=>{
            closeArtistModal(modal)
        })

        /*Inset player*/
        document.querySelectorAll('.artistModal__li--btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const button = parseInt(btn.getAttribute('data-index'));
                player(button, 'play');
            });
        });


    });
}

function closeArtistModal(modal){
    modal.style.display = 'none';

}

window.showArtist = showArtist;