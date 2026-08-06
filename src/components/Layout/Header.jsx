import { GiBlackBook } from 'react-icons/gi';
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
                <button><GiBlackBook/></button>
            </div>

            

        </header>
    )
}

export default Header;