const Task = require('../model/task')

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};

const addTask = (req, res) => {
	const {title, isCompleted, id, date, userId } = req.body

	new Task({title: title, isCompleted: isCompleted, id: id, date: date, userId: userId})
	.save()
	.then(response => res.send(response))
	.catch(err => checkError(err, res))
}

const getTasks = (req, res) => {
	const {id} = req.params
	Task.find({userId: id})
	.then(response => res.send(response))
	.catch(err => checkError(err, res))
}

const removeTask = (req, res) => {
	const {id} = req.body
	Task.remove({id:id})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const editTask = (req, res) => {
	const {id, title} = req.body

	Task.update({id:id},{title: title})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const checkTask = (req, res) => {
	const {id, isCompleted} = req.body

	Task.update({_id: id}, {isCompleted: isCompleted})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}


module.exports = {
	addTask,
	getTasks,
	removeTask,
	editTask,
	checkTask
}