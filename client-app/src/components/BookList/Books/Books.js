import classes from "./Books.module.css";
import Book from "./Book/Book";
const renderBooks = (books, onBookSelected) => {
    return books.map((book) => (
        <Book book={book} onBookSelected={onBookSelected} />
    ));
};
const Books = (props) => {
    console.log(props.books);
    return (
        <div className={classes.Books}>
            <h1>Hugo's Book List</h1>
            {props.books.length === 0 && (
                <div className={classes.InitialMessage}>
                    Create your very first book !
                </div>
            )}
            {props.books.length !== 0 && (
                <ul>{renderBooks(props.books, props.onBookSelected)}</ul>
            )}
        </div>
    );
};
export default Books;
