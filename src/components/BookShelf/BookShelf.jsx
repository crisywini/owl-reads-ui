import Book from "../Book";
import './BookShelf.css'

function BookShelf(){
    return (
        <div className="bookShelfContainer">
            <Book title="Giovanis Room" size={calculateSize("Giovanis Room")}></Book>
            <Book title="Cien años de soledad" size={calculateSize("Cien años de soledad")}></Book>
            <Book title="Nacidos de la bruma" size={calculateSize("Nacidos de la bruma")}></Book>
            <Book title="El hombre en busca de sentido" size={calculateSize("El hombre en busca de sentido")}></Book>

        </div>
    )
}

function calculateSize(title){
    var words = title.split(' ').length

    if(words <=2 ){
        return "small"
    } else if(words >=3 && words <=5){
        return 'medium'
    }
    return 'large'
}

export default BookShelf;