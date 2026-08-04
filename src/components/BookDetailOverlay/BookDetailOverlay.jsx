import { useSelectedBook } from '../../hooks/useSelectedBook';
import ReviewList from '../ReviewList';
import './BookDetailOverlay.css';

// The "open book" that appears once a spine has finished its pull-off-the-
// shelf animation. Renders nothing until there is actually a book to show.
function BookDetailOverlay() {
    const { selectedBook, status, closeBook, finishClosing } = useSelectedBook();

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
                    <ReviewList bookId={selectedBook.id} />
                </div>
            </div>
        </div>
    );
}

export default BookDetailOverlay;
