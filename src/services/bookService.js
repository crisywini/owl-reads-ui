import { get } from './httpClient';

export function getBooks() {
    return get('/books');
}
