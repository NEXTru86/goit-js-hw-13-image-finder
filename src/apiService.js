import { myPnotify } from './pnotify';

const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const KEY = '20830069-cef7a12a80181f560e8d6cc4d';

export default class PixabayApi {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    async fetchImages() {
        try {
            const url = `${BASE_URL}${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${KEY}`;
            const resultFetch = await fetch(url).then(response => response.json());

            this.incrementPage();

            if (resultFetch.total === 0) {
                myPnotify('Not Found images for your request. Please try again');
                return [];
            }

            return resultFetch;
        } catch (error) {
            myPnotify('Images is ended');
            console.log(error);
            return error;
        }
    }

    incrementPage() {
        this.pageNumber += 1;
    }

    resetPage() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};