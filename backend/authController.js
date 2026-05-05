import User from './models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.query;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

        res.cookie('token', token, { 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none'
        });
        
        res.json({ msg: 'Logged in successfully', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
};

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none'
    });
    res.json({ msg: 'Logged out successfully' });
};