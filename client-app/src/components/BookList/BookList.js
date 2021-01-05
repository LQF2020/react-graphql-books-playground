import classes from "./BookList.module.css";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import Books from "./Books/Books";
import BookHandler from "./BookHandler/BookHandler";
import { GET_All_AUTHORS_AND_BOOKS } from "../../graphql/requests";

const BookList = (props) => {
    const { loading, error, data: allAuthorsAndBooks } = useQuery(
        GET_All_AUTHORS_AND_BOOKS
    );
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const onBookCreated = (newBook) => {
        setBooks((books) => [...books, newBook]);
    };
    const onAuthorCreated = (newAuthor) => {
        setAuthors((authors) => [...authors, newAuthor]);
    };
    const initAuthorsAndBooks = () => {
        if (!books.length && !authors.length) {
            if (
                !loading &&
                error === undefined &&
                allAuthorsAndBooks.authors.length
            ) {
                setBooks(allAuthorsAndBooks.books);
                setAuthors(allAuthorsAndBooks.authors);
            }
        }
    };
    useEffect(() => {
        initAuthorsAndBooks();
    }, [allAuthorsAndBooks]);

    return (
        <div className={classes.BookList}>
            <Books books={books} onBookSelected={props.onBookSelected} />
            <BookHandler
                authors={authors}
                onBookCreated={onBookCreated}
                onAuthorCreated={onAuthorCreated}
            />
        </div>
    );
};
export default BookList;
