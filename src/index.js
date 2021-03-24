import ImageTmpl from './templates/template-card.hbs';
import API from './apiService';
import './styles.css';

var debounce = require('lodash.debounce');


const refs = {
    listGallery: document.querySelector('.gallery'),
    inputQuery: document.querySelector('#search-form'),
    btnLoadMore:document.querySelector('.get-more-btn'),
};

refs.inputQuery.addEventListener('input', debounce(onSearch, 1000));
// refs.btnLoadMore.addEventListener('click', );

function onSearch(evt) {
    if (evt.target.value !== '') {
       API.fetchImages(evt.target.value)
            .then(createGallery)
            .catch(error => console.log(error));
    };
};
    
function createGallery(images) {
    const listMarkup = ImageTmpl(images.hits);
        refs.listGallery.innerHTML = listMarkup;
};