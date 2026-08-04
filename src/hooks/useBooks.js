import { useCallback, useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';

// Fetches every book and exposes a refetch so callers (like AddBookForm,
// once a new book is saved) can ask for the latest shelf without this hook
// needing to know anything about how books get created.
export function useBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = useCallback(() => {
        return getBooks()
            .then((data) => {
                setBooks(data ?? []);
                setError(null);
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return { books, isLoading, error, refetch: fetchBooks };
}
