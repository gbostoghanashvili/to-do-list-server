const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const taskSchema = new mongoose.Schema({
	title: String,
	isCompleted: Boolean,
	userId: String

})

const Task = mongoose.model('tasks', taskSchema);

module.exports = Task
