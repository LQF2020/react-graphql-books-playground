import classes from "./BookHandler.module.css";
import CreateBook from "./CreateBook/CreateBook";
import CreateAuthor from "./CreateAuthor/CreateAuthor";
const BookHandler = (props) => {
    return (
        <div className={classes.BookHandler}>
            <CreateAuthor onAuthorCreated={props.onAuthorCreated} />
            <CreateBook
                onBookCreated={props.onBookCreated}
                authors={props.authors}
            />
        </div>
    );
};
export default BookHandler;
