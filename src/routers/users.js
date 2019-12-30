const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if(!user){
            return res.status(404).send('User does not exist');
        }
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'password', 'age'];
    const isValidUpdate = updates.every((update) => allowUpdates.includes(update));

    if(!isValidUpdate){
        return res.status(400).send('Invalid update operation');
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, { new : true, runValidators: true });
        if(!user){
            return res.status(404).send('User does not exist');
        }
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if(!user){
            return res.status(404).send('user does not exist');
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;