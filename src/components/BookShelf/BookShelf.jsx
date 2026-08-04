import BookSpine from '../BookSpine';
import './BookShelf.css';

// One wooden shelf holding a row of books. The library page renders several
// of these, one per chunk of books, so the page can scroll through many rows.
function BookShelf({ books }) {
    return (
        <div className="bookShelf">
            <div className="bookShelf__row">
                {books.map((book) => (
                    <BookSpine key={book.id} book={book} />
                ))}
            </div>
            <div className="bookShelf__plank" />
        </div>
    );
}

export default BookShelf;
