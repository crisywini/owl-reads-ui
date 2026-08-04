import { useEffect, useState } from 'react';
import { getReviewsByBookId } from '../services/reviewService';

// Fetches reviews for a single book. Each time a different book is opened,
// BookDetailOverlay mounts a brand new ReviewList (and therefore a fresh
// call to this hook), so isLoading only needs to be seeded once from the
// initial bookId instead of being reset from inside the effect.
export function useBookReviews(bookId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(() => Boolean(bookId));
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!bookId) return;

        let isCancelled = false;

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
