const Task = require('../model/task')

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};

const addTask = (req, res) => {
	const {title, isCompleted, userId } = req.body

	new Task({title, isCompleted, userId})
	.save()
	.then(response => res.send(response))
	.catch(err => checkError(err, res))
}

const getTasks = (req, res) => {
	const {id} = req.params
	Task.find({ userId: id })
	.then(response => res.send(response))
	.catch(err => checkError(err, res))
}



const removeTask = (req, res) => {
	const {id} = req.params

	Task.findByIdAndRemove({_id:id})
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const editTask = (req, res) => {
	const {id} = req.params
	const {title} = req.body

	Task.findByIdAndUpdate(id, { title })
	.then(response => res.send(response))
	.catch(err => checkError(err, res));
}

const checkTask = (req, res) => {
	const { id } = req.params
	const { isCompleted } = req.body

	Task.findByIdAndUpdate(id, { isCompleted })
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