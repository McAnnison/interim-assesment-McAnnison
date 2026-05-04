const mongoose = require('mongoose');

const CryptoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    change24h: { type: Number, required: true }, // e.g., +2.5
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crypto', CryptoSchema);