import Header from '../../components/Header';
import Footer from '../../components/Footer';
import BookShelf from '../../components/BookShelf';
import BookDetailOverlay from '../../components/BookDetailOverlay';
import { useBooks } from '../../hooks/useBooks';
import { chunkArray } from '../../utils/chunkArray';
import './LibraryPage.css';

const BOOKS_PER_SHELF = 8;

// Top-level page: fetches the full book collection once and splits it into
// shelves. Header/Footer bracket the shelves in normal document flow, so the
// page just scrolls like any other page as more shelves come into view.
function LibraryPage() {
    const { books, isLoading, error } = useBooks();
    const shelves = chunkArray(books, BOOKS_PER_SHELF);

    return (
        <div className="libraryPage">
            <Header />

            <main className="libraryPage__shelves">
                {isLoading && <p className="libraryPage__status">Loading the library...</p>}

                {error && (
                    <p className="libraryPage__status">
                        Couldn't load books. Make sure owl-service is running and reachable.
                    </p>
                )}

                {!isLoading && !error && books.length === 0 && (
                    <p className="libraryPage__status">No books yet. Add some through owl-service.</p>
                )}

                {shelves.map((shelfBooks, index) => (
                    <BookShelf key={index} books={shelfBooks} />
                ))}
            </main>

            <Footer />
            <BookDetailOverlay />
        </div>
    );
}

export default LibraryPage;
