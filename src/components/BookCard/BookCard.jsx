import './BookCard.css';

function BookCard({title, authors, imageUrl}) {
    return (
        <div>
            <div className='titleContainer'>
                <h1>{title}</h1>
                <h2>{authors}</h2>
            </div>
            <div className='imageContainer'>
                <img src={imageUrl} alt="logo"></img>
            </div>
    
        </div>
    )
}


export default BookCard;