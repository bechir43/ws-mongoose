const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name: String,
    age: Number
})

const Contact = mongoose.model('contact',contactSchema )
module.exports = Contact