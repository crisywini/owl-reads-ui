import ReviewCard from '../ReviewCard';
import './ReviewList.css';

// Purely presentational: renders whatever reviews it's handed. Data fetching
// lives in BookDetailOverlay so it can be shared with AddReviewForm, which
// needs to trigger a refetch after saving a new review.
function ReviewList({ reviews, isLoading, error }) {
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
