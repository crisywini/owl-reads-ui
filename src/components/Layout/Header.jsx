import './Header.css'

function Header(){
    return (
        <header className="headerContainer">
            <div className="emptyContainer">

            </div>
            
            
            <div className="titleContainer">
                <h1>Crisi Library</h1>
            </div>

            <div className="addBooksContainer">
                <button>Add new book</button>
            </div>

        </header>
    )
}

export default Header;