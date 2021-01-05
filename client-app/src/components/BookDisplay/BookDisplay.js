import classes from "./BookDisplay.module.css";
const BookDisplay = (props) => {
    return (
        <>
            {props.currBook && (
                <div className={classes.BookDisplay}>
                    <div className={classes.BookName}>
                        {props.currBook.name}
                    </div>

                    <div className={classes.BookDetails}>
                        <div className={classes.BookGenre}>
                            Genre: {props.currBook.genre}
                        </div>
                        <div className={classes.AuthorName}>
                            Author: {props.currBook.author.name}
                        </div>
                        <div className={classes.AuthorAge}>
                            Age: {props.currBook.author.age}
                        </div>
                    </div>
                </div>
            )}
            {props.currBook === null && (
                <div className={classes.InitialMessage}>
                    Please select a book !
                </div>
            )}
        </>
    );
};
export default BookDisplay;
