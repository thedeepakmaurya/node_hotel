const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

//Post request to menu item
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data saved successfully')
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

//Get data from server
router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log('data saved successfully')
        res.status(200).json(data)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

//Get data from server by taste
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        if (taste == 'spicy' || taste == 'sweet' || taste == 'savory') {
            const response = await MenuItem.find({ taste: taste });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid taste type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

module.exports = router;