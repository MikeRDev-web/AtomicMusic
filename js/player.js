import songsAvailable from './songsObjets.js';
import { lateralBar, lateralBarCloseOpenBtn } from './lateralBar.js';

let player = document.getElementById('player');
let audio = player.querySelector('audio');
let progressbar = player.querySelector('.progressbar');
let volumeInput = player.querySelector('.player__controls--input');

let activeRadio = false;
const atomicRadio = document.getElementById('atomicRadio');

document.addEventListener('DOMContentLoaded', () => {
    const playButtons = document.querySelectorAll('.songCard__play-btn');
    const playButtonsPlayList = document.querySelectorAll('.playList__li-songInfo-btn');

    // Función para agregar event listener a los botones
    function addClickListenerToButtons(buttons) {
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                const songAttribute = this.getAttribute('data-song-attribute');
                if (activeRadio === false) {
                    playSong(songAttribute, 'play');
                } else {
                    event.preventDefault();
                    atomicRadio.classList.add('flicker');
                    atomicRadio.innerHTML = `Desconectando...`
                    setTimeout(() => {
                        atomicRadio.innerHTML = `<a href="#" class="header__nav--a-radio" id="atomicRadio">
                            AtomicRadio
                        </a>`
                        playRadio();
                        atomicRadio.classList.remove('flicker');
                        playSong(songAttribute, 'play');
                    }, 3000);
                    activeRadio = false;
                }
            });
        });
    }

    // Agregar event listener a los botones de reproducción
    addClickListenerToButtons(playButtons);
    addClickListenerToButtons(playButtonsPlayList);
});

export function playSong(songId, type) {
    const songIn = songsAvailable[songId];
    if (type === 'play') {

        player.innerHTML = `<img src="${songIn.cover}" alt="empyPlayer" class="player__content--cover">
        <video class="videoClip" autoplay loop muted id="videoClip">
                        <source src="${songIn.videoClip}" type="video/mp4">
        </video>
        <div class="player__info">
            <h2 class="player__info--name">${songIn.name}</h2>
            <p class="player__info--artist">${songIn.artist}</p>
        </div>
        <div class="player__progressbar">
            <div class="progressbar"></div>
        </div>
        <div class="player__controls">
            <img src="/src/images/icons/pauseIcon.svg" alt="play" class="player__controls--btn" id="playBtn">
            <div class="volumControls">
                <input type="range" class="player__controls--input">
                <img src="/src/images/icons/volumeIcon1.svg" alt="volumen" class="player__controls--vol-icon" id="volIcon">
            </div>
            <a href="#" class="player__controls--btn-donate">
                Donar
            </a>
            <audio src="${songIn.song}" autoplay></audio>
        </div>`;

        lateralBarAnimation(lateralBar)

        // Obtener elementos relevantes después de la actualización del DOM
        audio = player.querySelector('audio');
        progressbar = player.querySelector('.progressbar');
        volumeInput = player.querySelector('.player__controls--input');

        // Escuchar el evento timeupdate del audio para actualizar el progressbar
        audio.addEventListener('timeupdate', updateProgressbar);

        // Asegurarse de detener la reproducción cuando cambias de canción
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            playBtn.setAttribute('src', '../src/images/icons/repeat.svg');
            updateProgressbar();
        });

        // Escuchar el evento input del elemento de rango para controlar el volumen
        let volIcon = document.getElementById('volIcon');
        volumeInput.addEventListener('input', () => {
            audio.volume = volumeInput.value / 100; // Convertir a un valor entre 0 y 1
            if (volumeInput.value <= 33.33) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon0.svg');
            } else if (volumeInput.value <= 66.66) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon1.svg');
            } else if (volumeInput.value <= 99.99) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon2.svg');
            }
        });

        volIcon.addEventListener('click', () => {
            audio.volume = 0;
            volIcon.setAttribute('src', '../src/images/icons/volumeIconMute.svg');
            volumeInput.value = 0;
        })

        const videoClip = document.getElementById('videoClip');
        const playBtn = document.getElementById('playBtn');
        playBtn.addEventListener('click', () => {
            if (playBtn.getAttribute('src') === '/src/images/icons/pauseIcon.svg') {
                playBtn.setAttribute('src', '/src/images/icons/play.svg');
                audio.pause();
                videoClip.pause();
            } else {
                playBtn.setAttribute('src', '/src/images/icons/pauseIcon.svg');
                audio.play();
                videoClip.play();
            }
        })
    } else if (type === 'radio') {

        player.innerHTML = `<img src="${songIn.cover}" alt="empyPlayer" class="player__content--cover">
    <video class="videoClip" autoplay loop muted id="videoClip">
                    <source src="${songIn.videoClip}" type="video/mp4">
    </video>
    <div class="player__info">
        <h2 class="player__info--name">${songIn.name}</h2>
        <p class="player__info--artist">${songIn.artist}</p>
    </div>
    <div class="player__progressbar">
        <div class="progressbar"></div>
    </div>
    <div class="player__controls">
        <p class="player__controls--btn-atiomicRadio">AtomicRadio</p>
        <div class="volumControls">
            <input type="range" class="player__controls--input">
            <img src="/src/images/icons/volumeIcon1.svg" alt="volumen" class="player__controls--vol-icon" id="volIcon">
        </div>
        <a href="#" class="player__controls--btn-donate">
            Donar
        </a>
        <audio src="${songIn.song}" autoplay></audio>
    </div>`;

        lateralBarAnimation(lateralBar)

        // Obtener elementos relevantes después de la actualización del DOM
        audio = player.querySelector('audio');
        progressbar = player.querySelector('.progressbar');
        volumeInput = player.querySelector('.player__controls--input');

        // Escuchar el evento timeupdate del audio para actualizar el progressbar
        audio.addEventListener('timeupdate', updateProgressbar);

        // Asegurarse de detener la reproducción cuando cambias de canción
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            updateProgressbar();
            playRadio();
        });

        // Escuchar el evento input del elemento de rango para controlar el volumen
        let volIcon = document.getElementById('volIcon');
        volumeInput.addEventListener('input', () => {
            audio.volume = volumeInput.value / 100; // Convertir a un valor entre 0 y 1
            if (volumeInput.value <= 33.33) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon0.svg');
            } else if (volumeInput.value <= 66.66) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon1.svg');
            } else if (volumeInput.value <= 99.99) {
                volIcon.setAttribute('src', '../src/images/icons/volumeIcon2.svg');
            }
        });

        volIcon.addEventListener('click', () => {
            audio.volume = 0;
            volIcon.setAttribute('src', '../src/images/icons/volumeIconMute.svg');
            volumeInput.value = 0;
        })
    }
}


function updateProgressbar() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressbar.style.width = `${progress}%`;
}

function lateralBarAnimation(bar) {
    bar.style.transform = 'translateX(0)';
    lateralBarCloseOpenBtn.setAttribute('src', '../src/images/icons/arrowClose.svg')
}




atomicRadio.addEventListener('click', ()=>{
    if(activeRadio === false) {
        event.preventDefault();
        atomicRadio.classList.add('flicker');
        atomicRadio.innerHTML = `Conectando...`
        setTimeout(() => {
            atomicRadio.innerHTML = `<a href="#" class="header__nav--a-radio" id="atomicRadio">
            AtomicRadio
            <img src="/src/images/icons/radioIcon.svg" alt="radio" class="nav__radioIcon flicker">
        </a>`
            playRadio();
            atomicRadio.classList.remove('flicker');
        }, 3000);
        activeRadio = true;
    } else {
        event.preventDefault();
        atomicRadio.classList.add('flicker');
        atomicRadio.innerHTML = `Desconectando...`
        setTimeout(() => {
            atomicRadio.innerHTML = `<a href="#" class="header__nav--a-radio" id="atomicRadio">
            AtomicRadio
        </a>`
            playRadio();
            atomicRadio.classList.remove('flicker');
            player.innerHTML = `<img src="/src/images/icons/empyPlayer.svg" alt="empyPlayer" class="player__content--cover">
        <div class="player__info">
            <h2 class="player__info--name">No hay nada reproduciéndose</h2>
            <p class="player__info--artist">Lo que reproduzcas aparecerá aquí</p>
        </div>
        <div class="player__progressbar">
            <div class="progressbar"></div>
        </div>
        <div class="player__controls">
            <img src="/src/images/icons/play.svg" alt="play" class="player__controls--btn">
            <div class="volumControls">
                <input type="range" class="player__controls--input">
                <img src="/src/images/icons/volumeIcon1.svg" alt="volumen" class="player__controls--vol-icon">
            </div>
            <a href="#" class="player__controls--btn-donate">
                Donar
            </a>
        </div>`
        }, 3000);
        activeRadio = false;
    }
})


function playRadio() {
    const randomSong = songsAvailable[Math.floor(Math.random() * songsAvailable.length)];

    playSong(randomSong.id, 'radio');
    if (progressbar.style.width === '100%') {
        playRadio();
    }
}



export default playSong;