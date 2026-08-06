import BookCard from '../BookCard';
import GiovannisRoom from '../../assets/GiovannisRoom.jpeg';
import './BookSideBar.css'

function BookSideBar(){
    return (
        <div className='bookSideBarContainer'>  
            <div className='addBookContainer'>
                <h1>Books</h1>

                <button>+</button>
            </div>

            <div className='searchContainer'>
                <input placeholder='Search Books...'></input>
            </div>

            <div className='bookListContainer'>
                <BookCard title="Giovanni's Room" authors="James Baldwin" imageUrl={GiovannisRoom}></BookCard>
                <BookCard title="Giovanni's Room" authors="James Baldwin" imageUrl={GiovannisRoom}></BookCard>
            </div>

        </div>
    )
}


export default BookSideBar;