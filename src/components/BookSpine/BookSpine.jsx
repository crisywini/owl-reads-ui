import { useSelectedBook } from '../../context/SelectedBookContext';
import { getSpineColor, getSpineHeight } from '../../utils/spineColor';
import './BookSpine.css';

// A single book standing on the shelf. Clicking it hands the book off to
// SelectedBookContext, which plays the "pulled off the shelf" animation
// before the BookDetailOverlay opens it.
function BookSpine({ book }) {
    const { selectedBook, status, selectBook, finishPulling } = useSelectedBook();

    const isSelected = selectedBook?.id === book.id;
    const isPulling = isSelected && status === 'pulling';
    const isRemoved = isSelected && (status === 'open' || status === 'closing');

    const classNames = ['bookSpine'];
    if (isPulling) classNames.push('bookSpine--pulling');
    if (isRemoved) classNames.push('bookSpine--removed');

    return (
        <button
            type="button"
            className={classNames.join(' ')}
            style={{ backgroundColor: getSpineColor(book), height: getSpineHeight(book) }}
            onClick={() => selectBook(book)}
            onAnimationEnd={() => isPulling && finishPulling()}
            aria-label={`Open ${book.title}`}
        >
            <span className="bookSpine__title">{book.title}</span>
        </button>
    );
}

export default BookSpine;
