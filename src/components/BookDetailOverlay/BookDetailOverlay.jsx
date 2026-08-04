import { useSelectedBook } from '../../hooks/useSelectedBook';
import { useBookReviews } from '../../hooks/useBookReviews';
import ReviewList from '../ReviewList';
import AddReviewForm from '../AddReviewForm';
import './BookDetailOverlay.css';

// The "open book" that appears once a spine has finished its pull-off-the-
// shelf animation. Renders nothing until there is actually a book to show.
function BookDetailOverlay() {
    const { selectedBook, status, closeBook, finishClosing } = useSelectedBook();
    const bookId = selectedBook?.id;
    const { reviews, isLoading, error, refetch } = useBookReviews(bookId);

    if (!selectedBook || status === 'idle' || status === 'pulling') {
        return null;
    }

    const isClosing = status === 'closing';

    return (
        <div
            className={`bookDetailOverlay${isClosing ? ' bookDetailOverlay--closing' : ''}`}
            onClick={closeBook}
        >
            <div
                className={`bookDetailOverlay__book${isClosing ? ' bookDetailOverlay__book--closing' : ''}`}
                onClick={(event) => event.stopPropagation()}
                onAnimationEnd={() => isClosing && finishClosing()}
            >
                <button
                    type="button"
                    className="bookDetailOverlay__close"
                    onClick={closeBook}
                    aria-label="Close book"
                >
                    ×
                </button>

                <h2 className="bookDetailOverlay__title">{selectedBook.title}</h2>
                <p className="bookDetailOverlay__authors">{selectedBook.authors?.join(', ')}</p>

                <div className="bookDetailOverlay__reviews">
                    <h3>Reviews</h3>
                    <ReviewList reviews={reviews} isLoading={isLoading} error={error} />
                    <AddReviewForm bookId={bookId} onReviewAdded={refetch} />
                </div>
            </div>
        </div>
    );
}

export default BookDetailOverlay;
