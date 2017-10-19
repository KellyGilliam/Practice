const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    toDoItem: String
})

const ToDo = mongoose.model('ToDo', toDoSchema, 'ToDo');

module.exports = ToDo;