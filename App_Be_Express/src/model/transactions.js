const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    qrCode: { type: String, required: true },
    rfId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: {type:Number, required: true},
    totalPrice: { type: Number, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
