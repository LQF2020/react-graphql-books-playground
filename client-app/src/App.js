import classes from "./App.module.css";
import BookList from "./components/BookList/BookList";
import BookDisplay from "./components/BookDisplay/BookDisplay";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { useState } from "react";
const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_SERVER,
    cache: new InMemoryCache(),
});
function App() {
    const [currBook, setCurrentBook] = useState(null);
    const onBookSelected = (book) => {
        setCurrentBook(book);
    };
    return (
        <ApolloProvider client={client}>
            <div className={classes.App}>
                <div className={classes.Left}>
                    <BookList onBookSelected={onBookSelected} />
                </div>
                <div className={classes.Right}>
                    <BookDisplay currBook={currBook} />
                </div>
            </div>
        </ApolloProvider>
    );
}

export default App;
