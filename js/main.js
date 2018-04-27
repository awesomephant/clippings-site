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
                callback(httpRequest);
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
    return sequence.join(' ');
}

const loadText = function () {
    makeRequest('./data/nyt-headlines.txt', function (response) {
        data.headlines = response.responseText;
    })
}
var template;
var clippingCount = 0;
var draggies = [];

const makeParagraphs = function(s){
    let pCount = 10;
    let index = 0;
    let paragraphs = [];
    for (let i = 0; i < pCount; i++){
        let length = gri(100, 200)
        paragraphs.push(s.substr(index, length))
        index += length;
    }
    return paragraphs;
}

const registerDrag = function (el) {
    let draggie = new Draggabilly(el, {
    });
    draggie.setPosition( 100, 100 )
    draggies.push(draggie);
}
const init = function () {
    makeRequest('./templates/clipping.html', function (response) {
        loadText()
        template = Handlebars.compile(response.responseText);
    })
    let clippings = []
}

const generateClipping = function (text) {
    clippingCount++;
    let clippingEl = document.querySelector('.clippings')
    let context = {
        headline: capitalise(getSequence(data.headlines, gri(6, 10))),
        body: makeParagraphs(getSequence(data.headlines, 400)),
        rotation: gra(-6, 6),
        height: gra(22, 33),
        columnCount: gri(1, 3),
        headlineStyle: gri(0, 3),
        index: clippingCount
    }

    html = template(context)
    clippingEl.insertAdjacentHTML('afterbegin', html);
    registerDrag(clippingEl.firstChild)
}

window.onload = function () {
    init();
};
//loadText();
//generateClipping();

clippingBtn.addEventListener('click', function (e) {
    generateClipping()
});