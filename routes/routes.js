const express = require('express');
const router = express.Router();
const todosTable = require('../services/todosTable');

router.get('/', (req, res) => {
    res.json({'message': 'ok'});
})

router.get('/todos', async function(req, res, next) {
    try {
        res.json(await todosTable.getTodos(req.query.page));
    } catch (err) {
        console.error(`Error while getting todos`, err.message);
        next(err);
    }
});

router.get('/todos/:id', async function(req, res, next) {
    try {
        res.json(await todosTable.getTodo(req.params.id));
    } catch (err) {
        console.error(`Error while getting todos`, err.message);
        next(err);
    }
});

router.post('/todos', async function(req, res, next) {
    try {
        res.json(await todosTable.create(req.body));
    } catch (err) {
        console.error(`Error while creating todo`, err.message);
        next(err);
    }
});

router.put('/todos/:id', async function(req, res, next) {
    try {
        res.json(await todosTable.update(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating todo`, err.message);
        next(err);
    }
});

router.patch('/todos/:id', async function(req, res, next) {
    try {
        res.json(await todosTable.updateStatus(req.params.id, req.body));
    } catch (err) {
        console.error(`Error while updating todo status`, err.message);
        next(err);
    }
});

router.delete('/todos/:id', async function(req, res, next) {
    try {
        res.json(await todosTable.remove(req.params.id));
    } catch (err) {
        console.error(`Error while deleting todo`, err.message);
        next(err);
    }
});

module.exports = router;