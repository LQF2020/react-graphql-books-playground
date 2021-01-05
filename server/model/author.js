const mongoose = require("mongoose");
const { Schema } = mongoose;

const AuthorSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    age: Number,
});

module.exports = mongoose.model("Author", AuthorSchema);
