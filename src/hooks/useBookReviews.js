import { useCallback, useEffect, useState } from 'react';
import { getReviewsByBookId } from '../services/reviewService';

// Fetches reviews for a single book and exposes a refetch so callers (like
// AddReviewForm, once a new review is saved) can ask for the latest list
// without this hook needing to know anything about how reviews get created.
export function useBookReviews(bookId) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(() => Boolean(bookId));
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(() => {
        if (!bookId) return Promise.resolve();

        return getReviewsByBookId(bookId)
            .then((data) => {
                setReviews(data ?? []);
                setError(null);
            })
            .catch((err) => setError(err))
            .finally(() => setIsLoading(false));
    }, [bookId]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, isLoading, error, refetch: fetchReviews };
}
