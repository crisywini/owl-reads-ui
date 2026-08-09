import { GiBlackBook } from 'react-icons/gi';
import { useState } from "react";
import './Header.css'

function Header(){

    const [addBookOpen, setAddBookOpenState] = useState(false)

    return (
        <header className="headerContainer">
            <div className="emptyContainer">

            </div>
            
            
            <div className="titleContainer">
                <h1>Crisi Library</h1>
            </div>

            <div className="addBooksContainer">
                <button onClick={()=> setAddBookOpenState(!addBookOpen)}><GiBlackBook/></button>
            </div>

            {addBookOpen && (
                <div
                    className="addBookOverlay"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            setAddBookOpenState(false)
                        }
                    }}
                >
                    <div className="addBookForm">
                        <button
                            type="button"
                            className="addBookFormClose"
                            onClick={() => setAddBookOpenState(false)}
                        >
                            x
                        </button>

                        <h2>Add Book</h2>

                        <form onSubmit={(e) => e.preventDefault()}>
                            <label>
                                Title
                                <input type="text" name="title" placeholder="Book title" />
                            </label>

                            <label>
                                Author
                                <input type="text" name="authors" placeholder="Author name" />
                            </label>

                            <label>
                                Image URL
                                <input type="text" name="imageUrl" placeholder="https://..." />
                            </label>

                            <button type="submit">Save</button>
                        </form>
                    </div>
                </div>
            )}

        </header>
    )
}

export default Header;