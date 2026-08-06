import Book from "../Book";
import './BookShelf.css'

function BookShelf(){
    return (
        <div className="bookShelfContainer">
            <Book title="Giovanis Book" ></Book>
            <Book title="Cien años de soledad" size="large"></Book>
            <Book title="Nacidos de la bruma"></Book>

        </div>
    )
}

export default BookShelf;