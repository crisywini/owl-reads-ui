import { get, post } from './httpClient';

export function getBooks() {
    return get('/books');
}

// book must include title and at least one non-blank author - those are the
// fields owl-service's usecase layer requires. cover_image and spine_color
// are optional.
export function createBook(book) {
    return post('/books', book);
}
