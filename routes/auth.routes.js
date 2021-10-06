const { Router } = require('express');
const User = require('../models/User.Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = Router()

router.post('/signup', async (req, res) => {
    const { name, username, password, email } = req.body;
    try {
        const usernames = await User.findOne({ username });
        if (usernames) {
            throw new Error('username already exists')
        }
        const emails = await User.findOne({ email })
        if (emails) {
            throw new Error('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, salt)

        await User.create({
            name,
            username,
            password: passwordHash,
            email
        })
        res.status(201).json({ message: 'user sucessful created' })
    } catch (error) {
        res.status(500).json({ msg: 'Error while creating user', error: error.message })
    }
})

//login

router.post('/login', async (req, res) => {
    const { email, username, password } = req.body;
    try {
        if (!email || !username, !password) {

            throw new Error('Missing username or password');
        }

        const user = await User.findOne({ $or: [{ email: email }, { username: username }] });
        const validation = bcrypt.compare(password, user.password);
        if (!user) {
            throw new Error('Wrong username or password');
        };
        if (!validation) {
            throw new Error('Wrong username or password');
        }
        console.log(user)
        const payload = {
            id: `${user._id}`,
            username: `${user.username}`,
            email: `${user.email}`
        };
        const token = jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '1day'
        })

        res.status(200).json({ user: payload, token })
    } catch (error) {
        res.status(500).json({ message: 'Error to trying to login', error: error.message })
    }
})
module.exports = router