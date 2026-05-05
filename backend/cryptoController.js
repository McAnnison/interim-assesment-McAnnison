import Crypto from './Crypto.js';

export const getAllCoins = async (req, res) => {
    try {
        const coins = await Crypto.find();
        res.json(coins);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching coins' });
    }
};

export const getTopGainers = async (req, res) => {
    try {
        const gainers = await Crypto.find().sort({ change24h: -1 });
        res.json(gainers);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching gainers' });
    }
};

export const getNewListings = async (req, res) => {
    try {
        const newListings = await Crypto.find().sort({ createdAt: -1 });
        res.json(newListings);
    } catch (err) {
        res.status(500).json({ msg: 'Error fetching new listings' });
    }
};

export const addCoin = async (req, res) => {
    try {
        const newCoin = await Crypto.create(req.body);
        res.status(201).json(newCoin);
    } catch (err) {
        res.status(400).json({ msg: 'Failed to add coin' });
    }
};