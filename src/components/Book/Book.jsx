import './Book.css'
function Book({title, size = 'medium'}){
    return (
        <div className={`bookContainer book--${size}`}>
            <h1>{title}</h1>
        </div>
    )
}


export default Book;