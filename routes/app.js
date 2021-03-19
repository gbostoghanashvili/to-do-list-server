const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const authHandler = require('../controller/auth')
const taskHandler = require('../controller/tasks')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.post('/signup', (req, res) => authHandler.signUp(req,res));
app.get('/', (req, res) => authHandler.fetchUsers(req, res));

app.post('/tasks/:id', (req, res) => taskHandler.addTask(req,res));
app.get('/tasks/:id', (req, res) => taskHandler.getTasks(req,res));
app.post('/tasks/remove/:id', (req, res) => taskHandler.removeTask(req,res));
app.post('/tasks/edit/:id', (req, res) => taskHandler.editTask(req,res));
app.post('/tasks/check/:id', (req, res) => taskHandler.checkTask(req,res));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

