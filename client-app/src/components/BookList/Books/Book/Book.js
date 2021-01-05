import classes from "./Book.module.css";
const Book = (props) => {
    return (
        <li
            className={classes.Book}
            key={props.book._id}
            onClick={() => props.onBookSelected(props.book)}
        >
            {props.book.name}
        </li>
    );
};
export default Book;
