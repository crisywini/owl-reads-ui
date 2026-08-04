import { useEffect, useState } from 'react';
import { getReviewsByBookId } from '../services/reviewService';

// Fetches reviews for a single book. bookId is nullable so callers can wait
// until a book is actually selected before making a request.
export function useBookReviews(bookId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookId) {
            setReviews([]);
            return;
        }

        let isCancelled = false;
        setIsLoading(true);
        setError(null);

        getReviewsByBookId(bookId)
            .then((data) => {
                if (!isCancelled) setReviews(data ?? []);
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
    }, [bookId]);

    return { reviews, isLoading, error };
}
