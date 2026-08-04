import { useBookReviews } from '../../hooks/useBookReviews';
import ReviewCard from '../ReviewCard';
import './ReviewList.css';

// Fetches and renders every review for a single book. Owns its own data
// fetching (via useBookReviews) so the overlay that hosts it only has to
// pass down a bookId.
function ReviewList({ bookId }) {
    const { reviews, isLoading, error } = useBookReviews(bookId);

    if (isLoading) {
        return <p className="reviewList__status">Loading reviews...</p>;
    }

    if (error) {
        return <p className="reviewList__status">Couldn't load reviews. Is owl-service running?</p>;
    }

    if (reviews.length === 0) {
        return <p className="reviewList__status">No reviews yet for this book.</p>;
    }

    return (
        <ul className="reviewList">
            {reviews.map((review) => (
                <li key={review.id}>
                    <ReviewCard review={review} />
                </li>
            ))}
        </ul>
    );
}

export default ReviewList;
