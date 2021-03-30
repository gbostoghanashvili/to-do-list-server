const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./error/errorHandler')
const userRouter = require('./routes/users')
const tasksRouter = require('./routes/tasks')

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/user', userRouter)
app.use('/tasks', tasksRouter)

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;

