const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLenght: 50,
    },
    lastName: {
        type: String,
        trim: true,
        maxLenght: 50,
    },
    password: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error(`Your password: ${value} is invalid.`)
            }
        }
    },
    emailId: {
        type: String,
        lowercase: true, 
        unique: true,
        required: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Enter valid email. this email ${value} is not valid. Email should be in the formate 'foo@bar.com'`)
            }
        }
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender data is not valid. It could only be 'male' OR 'female' OR'other'");
            }
        }
    },
    age: {
        type: Number,
        min:10,
        max:100
    },
    about: {
        type: String,
        default: "This is the default syntax of about.",
        minLength: 2,
        maxLenght:500,
    },
    photoUrl: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2IYhSn8Y9S9_HF3tVaYOepJBcrYcd809pBA&s",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error(`Enter valid photo URL. ${value} not valid URL`);
            }
        }
    },
    skills: {
        type: [String], 
        validate:{
            validator: function(value){
                return value.length <= 10;
            },
            message: props => `You can only have up to 10 skills, but you provided ${props.value.length}`
        }
    }
},{timestamps: true});

module.exports = mongoose.model("User", userSchema);