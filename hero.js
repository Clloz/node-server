var list = document.querySelector(".hero-list");
var activeEl = null;

list.addEventListener('click', function (e) {
    // console.log(e.target)
    if (e.target.tagName.toLowerCase() === "li") {
        if (e.target.classList.contains('up')) {
            e.target.classList.remove('up');
            e.target.classList.add('down');
            activeEl = null;
        } else {
            if(activeEl) {
                activeEl.classList.remove('up');
                activeEl.classList.add('down');         
            } 
            activeEl = e.target;
            e.target.classList.remove('down');
            e.target.classList.add('up');
            getHero(e.target);
        } 
    }
})

function getHero(el) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/hero', true);
    xhr.onload = function () {
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            // console.log(xhr.responseText);
            el.querySelector('.back').innerText = xhr.responseText;
        }
    }
    xhr.send('name=' + el.getAttribute('data-hero'))
}
