
function openClosePL(btn, list) {
const buttonPlayList = document.getElementById(`${btn}`);
const playListContent = document.getElementById(`${list}`);

buttonPlayList.addEventListener('click', ()=>{
        if(playListContent.style.display === 'none') {
            buttonPlayList.style.transform = 'rotate(90deg)';
            playListContent.style.display = 'flex';
            playListContent.style.opacity = '1';
            playListContent.style.animation = 'openPLayList 1s ease-in-out';
        } else {
            playListContent.style.display = 'none';
            buttonPlayList.style.transform = 'rotate(0deg)';
        }
    })
}