export let lateralBar = document.getElementById('lateralBar');
export let lateralBarCloseOpenBtn = document.getElementById('lateralBarCloseOpenBtn');

function openCloseBar(bar, btn) {
    if (bar.style.transform === 'translateX(-25rem)') {
        bar.style.transform = 'translateX(0)';
        btn.setAttribute('src', '/src/images/icons/arrowClose.svg');
    } else {
        bar.style.transform = 'translateX(-25rem)';
        btn.setAttribute('src', '/src/images/icons/arrowOpen.svg');
    }
}

lateralBarCloseOpenBtn.addEventListener('click', ()=>{
    openCloseBar(lateralBar, lateralBarCloseOpenBtn);
})
