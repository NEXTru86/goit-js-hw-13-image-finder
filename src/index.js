import ImageTmpl from './templates/template-card.hbs';
import PixabayApi from './apiService';
import { onClickImage } from './modal-img';
import './styles.css';

var debounce = require('lodash.debounce');

const pixabayApi = new PixabayApi();


const refs = {
    listGallery: document.querySelector('.gallery'),
    inputQuery: document.querySelector('#search-form'),
    watcher:document.querySelector('.watcher'),
};

refs.inputQuery.addEventListener('input', debounce(onSearch, 500));
refs.inputQuery.addEventListener('submit', stopDefAction);
refs.listGallery.addEventListener('click', onClickImage);

function stopDefAction(evt) {
    evt.preventDefault();
};

function onSearch({ target }) {
    pixabayApi.query = target.value;
    if (pixabayApi.query === '') {
        clearArticlesList();

        return;
    }

    clearArticlesList();
    pixabayApi.resetPage();
    fetchToPixabayApiAndRender();
    
};

function fetchToPixabayApiAndRender() {
    pixabayApi.fetchImages().then(appendImagesMarkup);
};

function appendImagesMarkup({ hits }) {
    refs.listGallery.insertAdjacentHTML('beforeend', ImageTmpl(hits));
};

function clearArticlesList() {
    refs.listGallery.innerHTML = '';
};

const intersectionCallback = entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && pixabayApi.query !== '') {
            fetchToPixabayApiAndRender();
        }
    });
};

const intersectionOptions = {
    rootMargin: '0% 0% 10% 0%',
};

const observer = new IntersectionObserver(
    intersectionCallback,
    intersectionOptions,
);

observer.observe(refs.watcher);