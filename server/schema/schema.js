const _ = require("lodash");
const mongoose = require("mongoose");
const Author = require("../model/author.js");
const Book = require("../model/book.js");
const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return Author.findById({ _id: parent.authorID }).exec();
            },
        },
    }),
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({ authorID: parent._id }).exec();
            },
        },
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: "RootQuery",
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Book.findById({ _id: args.id }).exec();
            },
        },
        author: {
            type: AuthorType,
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parent, args) {
                return Author.findById({ _id: args.id }).exec();
            },
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.find({}).exec();
            },
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.find({});
            },
        },
    }),
});

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args) {
                let author = new Author({
                    _id: new mongoose.Types.ObjectId(),
                    name: args.name,
                    age: args.age,
                });
                return author.save();
            },
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                authorID: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                let book = new Book({
                    _id: new mongoose.Types.ObjectId(),
                    name: args.name,
                    genre: args.genre,
                    authorID: args.authorID,
                });
                return book.save();
            },
        },
    },
});
module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation: MutationType,
});

// const books = [
//     { name: "wonder island", genre: "Fantasy", authorID: "1", id: "1" },
//     {
//         name: "dream to reality",
//         genre: "Fantasy",
//         authorID: "2",
//         id: "2",
//     },
//     {
//         name: "dream to reality season 2",
//         genre: "Fantasy",
//         authorID: "2",
//         id: "3",
//     },
//     {
//         name: "dream to reality season 3",
//         genre: "Fantasy",
//         authorID: "2",
//         id: "4",
//     },
//     {
//         name: "wonder island : final",
//         genre: "Fantasy",
//         authorID: "1",
//         id: "5",
//     },
// ];
// const authors = [
//     { name: "Paul Logan", age: 66, id: "1" },
//     {
//         name: "Jenny Panda",
//         age: 11,
//         id: "2",
//     },
// ];
