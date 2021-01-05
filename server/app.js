const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const MyGraphQLSchema = require("./schema/schema");

const app = express();
const PORT = 4000;
const DB_URI = "mongodb://localhost:27017/gql-books";

var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(
    "/graphql",
    cors(corsOptions),
    graphqlHTTP({
        schema: MyGraphQLSchema,
        graphiql: true,
    })
);

mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
    app.listen(PORT, () => {
        console.log(
            "The app is listening on: " + `http://127.0.0.1:${PORT}/graphql`
        );
    });
});
