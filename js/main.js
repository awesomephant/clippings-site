var gra = function (min, max) {
    return Math.random() * (max - min) + min;
}
var gri = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const capitalise = function (s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
}

const clippingBtn = document.querySelector('#js-clippingButton')
const resultEl = document.querySelector('.result')

// Via https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX/Getting_Started
function makeRequest(url, callback) {
    httpRequest = new XMLHttpRequest();
    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                callback(httpRequest.responseText);
            } else {
                alert('There was a problem with the request.');
            }
        }
    }
    httpRequest.open('GET', url);
    httpRequest.send();
}

let data = {
    headlines: ''
}

const getSequence = function (source, length) {
    let words = source.split(' ')
    //let sequence = words.slice(gri(0, words.length - length), length)
    let index = gri(0, words.length - length);
    let sequence = words.slice(index, index + length)
    console.log(sequence)
    return sequence.join(' ');
}

const loadText = function () {
    makeRequest('./data/nyt-headlines.txt', function (response) {
        data.headlines = response;
    })
}
var draggies;
const init = function () {

    let clippingElements = document.querySelectorAll('.clipping');
    let clippings = []
    draggies = []
    for (var i = 0; i < clippingElements.length; i++) {
        let clipping = clippingElements[i];
        let draggie = new Draggabilly(clipping, {
            // options...
        });
        draggies.push(draggie);
    }
}

const generateClipping = function (text) {
    let clippingEl = document.querySelector('.clipping')
    let headlineEl = document.querySelector('.clipping-title')
    let bodyEl = document.querySelector('.clipping-body')

    let headline = capitalise(getSequence(data.headlines, gri(6, 10)))
    headlineEl.innerHTML = headline;
    clippingEl.style.transform = 'rotate(' + gra(-6, 6) + 'deg)'
}
init();
loadText();


clippingBtn.addEventListener('click', function (e) {
    console.log('hi')
    generateClipping()
});