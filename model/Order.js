var mongoose = require('mongoose'), Schema = mongoose.Schema;

var orderSchema = new Schema({
    number: Number,
    size: String,
    crust: String,
    topping: Array,
    name: String,
    address: String,
    city: String,
    postal: String,
    phone: String,
    email: String,
    amount: Number
});

module.exports = mongoose.model('Order', orderSchema);