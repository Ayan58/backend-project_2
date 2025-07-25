const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    username: {
        type: String,
        required: true
        
    },
    password: {
        type: String,
        required: true
        
    }, 
    role: {
        type: String,
        enum: ["voter", "admin"],
        default: "voter"
    },
    identity_num: {
        type: Number,
        required: true,
        unique: true
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;