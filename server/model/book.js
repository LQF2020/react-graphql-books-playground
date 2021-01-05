const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    genre: String,
    authorID: mongoose.Types.ObjectId,
});

module.exports = mongoose.model("Book", BookSchema);
