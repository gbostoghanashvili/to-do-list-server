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

const checkAllTasks = (req, res) => {
	const { check } = req.body
	const {id} = req.params

	Task.find({userId:id})
	.then(response => {
	const ids = response.map(task => task._id)
		ids.forEach(id => {
			Task.findByIdAndUpdate(id, {isCompleted:check})
				.then(() => res.send())
			.catch(err => checkError(err, res))
		})
	})
}

const deleteChecked = (req, res) => {
	const {id} = req.params

	Task.find({userId:id})
	.then(response => {
		const filteredTasks = response.filter(task => task.isCompleted === true)
		const ids = filteredTasks.map(task => task._id)
		ids.forEach(id => {
			Task.findByIdAndRemove({_id:id})
			.then(() => res.send())
			.catch(err => checkError(err, res))
		})
		res.send()
	})
	.catch(err => checkError(err, res))
}

module.exports = {
	addTask,
	getTasks,
	removeTask,
	editTask,
	checkTask,
	checkAllTasks,
	deleteChecked
}