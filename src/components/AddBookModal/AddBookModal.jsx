import AddBookForm from '../AddBookForm';
import './AddBookModal.css';

// Simple backdrop + panel around AddBookForm. Unlike BookDetailOverlay this
// isn't "opening" an existing book, so it just fades and pops in rather than
// playing the spine/cover animations.
function AddBookModal({ onClose, onBookAdded }) {
    return (
        <div className="addBookModal" onClick={onClose}>
            <div className="addBookModal__panel" onClick={(event) => event.stopPropagation()}>
                <button
                    type="button"
                    className="addBookModal__close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <h2 className="addBookModal__title">Add a book</h2>

                <AddBookForm onBookAdded={onBookAdded} />
            </div>
        </div>
    );
}

export default AddBookModal;
