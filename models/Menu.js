const mongoose = require('mongoose')

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        requires: true
    },
    taste: {
        type: String,
        enum: ['Sweet', 'Spicy', 'Sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredient: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
})


const Menu = mongoose.model("Menu", menuSchema, "Menu")

module.exports = Menu;