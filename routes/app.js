const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');
const authHandler = require('../controller/auth');
const taskHandler = require('../controller/tasks');
const errorHandler = require('../error/errorHandler')
const authMiddleware = require('../middleware/authmiddleware');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.post('/signup', (req, res, next) => authHandler.signUp(req, res,next));
app.post('/', (req, res, next) => authHandler.logUserIn(req, res, next));
app.post('/check', authMiddleware, (req, res, next) => authHandler.check(req, res, next))

app.post('/tasks/:id', (req, res) => taskHandler.addTask(req, res));
app.get('/tasks/:id', (req, res) => taskHandler.getTasks(req, res));
app.post('/tasks/remove/:id', (req, res) => taskHandler.removeTask(req, res));
app.post('/tasks/edit/:id', (req, res) => taskHandler.editTask(req, res));
app.post('/tasks/check/:id', (req, res) => taskHandler.checkTask(req, res));

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

app.use(errorHandler);
module.exports = app;

