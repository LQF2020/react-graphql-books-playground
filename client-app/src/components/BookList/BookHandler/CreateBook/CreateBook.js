import classes from "./CreateBook.module.css";
import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const ADD_BOOK = gql`
    mutation AddBook($name: String!, $genre: String!, $authorID: ID!) {
        addBook(name: $name, genre: $genre, authorID: $authorID) {
            _id
            name
            genre
            author {
                name
                age
            }
        }
    }
`;
const renderAllAuthors = (authors) => {
    return authors.map((author) => (
        <option value={author._id} key={author._id}>
            {author.name}
        </option>
    ));
};

const CreateBook = (props) => {
    const [addBook, { data: newBook }] = useMutation(ADD_BOOK);
    const [bookname, setBookName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorID, setAuthorID] = useState("");
    const createBook = () => {
        if (bookname && genre && authorID) {
            addBook({
                variables: { name: bookname, genre: genre, authorID: authorID },
            });
        } else {
            alert("Unable to create book. Please complete all the fields.");
        }
    };
    useEffect(() => {
        if (newBook && newBook.addBook) {
            props.onBookCreated(newBook.addBook);
        }
    }, [newBook]);
    return (
        <div className={classes.CreateBook}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createBook();
                }}
            >
                <label htmlFor="bname">Book Name</label>
                <input
                    type="text"
                    id="bname"
                    name="bookname"
                    placeholder="Book name.."
                    value={bookname}
                    onChange={(event) => {
                        setBookName(event.target.value);
                    }}
                />

                <label htmlFor="genre">Genre</label>
                <input
                    type="text"
                    id="genre"
                    name="genre"
                    placeholder="Genre.."
                    value={genre}
                    onChange={(event) => {
                        setGenre(event.target.value);
                    }}
                />

                <label htmlFor="author">Author</label>
                <select
                    id="author"
                    name="author"
                    value={authorID}
                    onChange={(event) => {
                        setAuthorID(event.target.value);
                    }}
                >
                    <option value="" disabled hidden>
                        Choose here
                    </option>
                    {props.authors && renderAllAuthors(props.authors)}
                </select>

                <input type="submit" value="Create" />
            </form>
        </div>
    );
};

export default CreateBook;
