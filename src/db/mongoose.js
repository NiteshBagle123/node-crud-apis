const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// user table model
const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(email){
            if(!validator.isEmail(email)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(password){
            if(password.toLowerCase().includes('password')){
                throw new Error('password can not contain "password"');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be positive number')
            }
        }
    }
});

const me = new User({
    name: ' Nitesh ',
    email: ' MYEMAIL@bagle.com ',
    password: 'phone098!'
});

me.save().then(() => {
    console.log(me);
}).catch(error => {
    console.log('Error while inserting document in database', error);
});

// task table model
const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

const task = new Task({
});

task.save().then(() => {
    console.log(task);
}).catch(error => {
    console.log('Error inserting task document in database', error);
});
