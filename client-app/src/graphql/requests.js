import { gql } from "@apollo/client";
const ADD_AUTHOR = gql`
    mutation AddAuthor($name: String!, $age: Int!) {
        addAuthor(name: $name, age: $age) {
            _id
            name
        }
    }
`;
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
const GET_All_AUTHORS_AND_BOOKS = gql`
    query GetAllAuthorsAndBooks {
        books {
            _id
            name
            genre
            author {
                name
                age
            }
        }
        authors {
            _id
            name
        }
    }
`;

export { ADD_AUTHOR, ADD_BOOK, GET_All_AUTHORS_AND_BOOKS };
