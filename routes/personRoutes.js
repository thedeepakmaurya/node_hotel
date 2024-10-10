const express = require('express');
const router = express.Router();
const Person = require('../models/Person');

//Post route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; //assuming rquest body contains the person data
        const newPerson = new Person(data); // create a new person document using the mongoose model
        const response = await newPerson.save() //save the new person to the database
        console.log('data saved successfully')
        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });

    }
})

// Get method to get the person
router.get('/', async (req, res) => {
    try {
        const data = await Person.find()
        console.log('data fetched successfully')
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

// Get method to get person by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})


//put method to update the data
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data updated!');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

//delete method to delete person
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const response = await Person.findByIdAndDelete(personId);

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('Data deleted!');
        res.status(200).json({ message: 'person deleted successfully' });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })

    }
})


module.exports = router;

