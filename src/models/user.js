const mongoose = require('mongoose');
const validator = require('validator');
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

module.exports = User;
