require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const MyGraphQLSchema = require("./schema/schema");
const app = express();

const HOST = process.env.APP_HOST;
const PORT = process.env.APP_PORT;
const DB_URI = process.env.DB_URI;

var corsOptions = {
    origin: process.env.CLIENT_ORIGIN,
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
        console.log("The app is listening on: " + `${HOST}:${PORT}/graphql`);
    });
});
