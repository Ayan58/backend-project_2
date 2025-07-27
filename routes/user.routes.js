import express from "express";
import User from '../models/user.model.js';
import {jwtAuthMiddleware, generateToken} from '../jwt.js';
const router = express.Router();

router.post('/signup', async (req, res) =>{
    try{
        const data = req.body
        const adminUser = await User.findOne({ role: 'admin' });
        if (data.role === 'admin' && adminUser) {
            return res.status(400).json({ error: 'Admin user already exists' });
        }

        const existingUser = await User.findOne({ identity_num: data.identity_num });
        if (existingUser) {
            return res.status(400).json({ error: 'User with the same Identity Number already exists' });
        }

        const newUser = new User(data);
        const response = await newUser.save();
        console.log('data saved');

        const payload = {
            id: response.id
        }
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);

        res.status(200).json({response: response, token: token});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Signup failed!!!'});
    }
})

router.post('/login', async(req, res) => {
    try{
        const {identity_num, password} = req.body;
        if (!identity_num || !password) {
            return res.status(400).json({ error: 'Give both identity number and password' });
        }

        const user = await User.findOne({identity_num: identity_num});

        if( !user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid Number or Password'});
        } 
        const payload = {
            id: user.id,
        }
        const token = generateToken(payload);
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
    }
})

router.put('/profile/password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'enter both currentPassword and newPassword' });
        }

        const user = await User.findById(userId);
        if (!user || !(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ error: 'Password not matched' });
        }

        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;