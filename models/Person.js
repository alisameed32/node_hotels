const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Defining Schema

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    // Hash the password if only its modified (or is new)
    if (!person.isModified('password')) return next();
    
    try {
        // generate salt
        const salt = await bcrypt.genSalt(10); 

        // hash the pass 
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // Override the plain password with the hashed one
        person.password = hashedPassword;

        next();
    } catch (error) {
        next(error);
    }
});

personSchema.methods.comparePassword = async function(enteredPass) {
    try {
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(enteredPass, this.password);
        return isMatch;
    } catch (error) {
        throw error
    }
}


const Person = mongoose.model("Person", personSchema);
module.exports = Person;
