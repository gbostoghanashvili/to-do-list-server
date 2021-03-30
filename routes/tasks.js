const express = require('express')
const router = express.Router()

const taskHandler = require('../controller/tasks');


router.post('/:id', (req, res) => taskHandler.addTask(req, res));
router.get('/:id', (req, res) => taskHandler.getTasks(req, res));
router.post('/remove/:id', (req, res) => taskHandler.removeTask(req, res));
router.post('/edit/:id', (req, res) => taskHandler.editTask(req, res));
router.post('/check/:id', (req, res) => taskHandler.checkTask(req, res));
router.post('/checkAll/:id', (req, res) => taskHandler.checkAllTasks(req,res))
router.post('/deleteChecked/:id', (req, res) => taskHandler.deleteChecked(req,res))



module.exports = router;
