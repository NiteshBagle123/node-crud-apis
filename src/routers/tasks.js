const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send([
            {
                code: 400,
                message: error.message
            }
        ]);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if(!task){
            return res.status(404).send('Task does not exist');
        }
        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed' ];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send('Invalid Update Operation');
    }
    
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true });
        if(!task) {
            return res.status(404).send('Task does not exist which want to update');
        }
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
})

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if(!task){
            return res.status(404).send('task does not exist');
        }
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;