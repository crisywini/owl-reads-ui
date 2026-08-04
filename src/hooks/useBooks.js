import { useEffect, useState } from 'react';
import { getBooks } from '../services/bookService';

// Fetches every book once when the component mounts and exposes the
// three states a UI typically needs: still loading, failed, or ready.
export function useBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCancelled = false;

        getBooks()
            .then((data) => {
                if (!isCancelled) setBooks(data ?? []);
            })
            .catch((err) => {
                if (!isCancelled) setError(err);
            })
            .finally(() => {
                if (!isCancelled) setIsLoading(false);
            });

        return () => {
            isCancelled = true;
        };
    }, []);

    return { books, isLoading, error };
}
