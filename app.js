const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

app.use(cors());

const toDoSchema = new mongoose.Schema({
	title: String,
	checked: Boolean,
	date: Date
}, {collection: 'ToDoItems'});

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
	tasks: [
		{
			title: String,
			isCompleted: Boolean,
			id: String,
			date: Date,
		},
	]
});

const ToDoItem = mongoose.model('ToDoItem', toDoSchema);
const User = mongoose.model('User', userSchema);

const checkError = (err, res) => {
	res.send(err.message ? err.message : err);
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/signup', (req, res) => {
	const newUser = new User({name: req.body.name, email: req.body.email, password: req.body.password});
	newUser.save().then(() => {
		res.send(newUser);
	}).catch((error) => {
		checkError(error, res);
	});
});

app.get('/auth', (req, res) => {
	User.find({}).then((response) => {
		res.send(response);
	}).catch((err) => {
		checkError(err, res);
	});
});

app.post('/tasks/:id', (req, res) => {

	const task = {
		title: req.body.title,
		isCompleted: req.body.checked,
		id: req.body.id,
		date: req.body.date
	};

	User.find({_id: req.params.id}).then(response => {
		let tasks = response[ 0 ].tasks;
		tasks.unshift(task);

		User.findByIdAndUpdate(req.params.id, {tasks: tasks}).then(response => {
			res.send(response);
		}).catch((error) => {
			checkError(error, res);
		});
	});
});

app.post('/tasks/remove/:id', (req, res) => {
	User.find({_id: req.params.id}).then(response => {
		let tasks = response[ 0 ].tasks
		tasks = tasks.filter(task => task.id !== req.body.id)

		User.findByIdAndUpdate(req.params.id, {tasks: tasks}).then(response => {
			res.send(response);
		}).catch((err) => {
			checkError(err, res);
		});
	});
});

app.post('/tasks/edit/:id', (req, res) => {
	User.find({_id: req.params.id}).then(response => {
		let tasks = response[ 0 ].tasks
		let taskToEdit = tasks.find(task => task.id === req.body.id)
		taskToEdit.title = req.body.title

		User.findByIdAndUpdate(req.params.id, {tasks: tasks}).then(response => {
			res.send(response);
		}).catch((err) => {
			checkError(err, res);
		});
	});
});

app.post('/tasks/check/:id', (req, res) => {
	User.find({_id: req.params.id}).then(response => {
		let tasks = response[ 0 ].tasks
		let taskToEdit = tasks.find(task => task.id === req.body.id)
		taskToEdit.isCompleted = req.body.isCompleted

		User.findByIdAndUpdate(req.params.id, {tasks: tasks}).then(response => {
			res.send(response);
		}).catch((err) => {
			checkError(err, res);
		});
	});
});

app.get('/tasks/:id', (req, res) => {
	User.find({_id: req.params.id}).then(response => {
		res.send(response[ 0 ].tasks);
	}).catch((err) => {
		checkError(err, res);
	});
});



app.post('/add', (req, res) => {
	const newItem = new ToDoItem({title: req.body.title, checked: req.body.checked, date: req.body.date});
	newItem.save().then(() => {
		res.send(newItem);
	}).catch((error) => {
		checkError(error, res);
	});
});

app.get('/', (req, res) => {
	ToDoItem.find({}).then((response) => {
		res.send(response);
	}).catch((err) => {
		checkError(err, res);
	});
});

app.post('/edit/:id', (req, res) => {

	ToDoItem.findByIdAndUpdate(req.params.id, {title: req.body.title, checked: req.body.checked}).then(response => {
		res.send(response);
	}).catch((error) => {
		checkError(error, res);
	});
});

app.post('/remove/:id', (req, res) => {
	ToDoItem.findByIdAndRemove(req.params.id).then((response) => {
		res.send(response);
	}).catch((error) => {
		checkError(error, res);
	});
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

