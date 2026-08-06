import './BookCard.css';

function BookCard({title, authors, imageUrl}) {
    return (
        <div className="bookCardContainer">
            <div className='imageContainer'>
                <img src={imageUrl} alt="logo"></img>
            </div>
            <div className='titleContainer'>
                <h2>{title}</h2>
                <h3>{authors}</h3>
            </div>

    
        </div>
    )
}


export default BookCard;