import './Header.css';

function Header({ onAddBook }) {
    return (
        <header className="libraryHeader">
            <button type="button" className="libraryHeader__addBook" onClick={onAddBook}>
                + Add Book
            </button>

            <h1 className="libraryHeader__title">Crisi's Library</h1>
            <p className="libraryHeader__subtitle">Pick a book off the shelf to read its reviews</p>
        </header>
    );
}

export default Header;
