const mongoose = require('mongoose')

const Schema = mongoose.Schema
const logerSchema = new Schema({
    email:String,
    rollno: String,
    dept: String,
    isd:String,
    stat:String
})
module.exports = mongoose.model('loger',logerSchema,'logdata')