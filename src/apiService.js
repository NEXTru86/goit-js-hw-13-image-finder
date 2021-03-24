const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
const KEY = '20830069-cef7a12a80181f560e8d6cc4d';
const pageNumber = 1;

function fetchImages(searchQuery) {
    const url = `${BASE_URL}${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`;
    return fetch(url).then(response => response.json());
    
    
};

export default { fetchImages };