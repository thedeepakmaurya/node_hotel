const express = require('express');
const app = express();
const db = require('./db');
// const Person = require('./models/Person');
// const MenuItem = require('./models/MenuItem');


// Middleware to parse JSON request bodies
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to our hotel!');
})

// app.post('/person', async (req, res) => {
//     try {
//         const data = req.body; //assuming rquest body contains the person data
//         const newPerson = new Person(data); // create a new person document using the mongoose model
//         const response = await newPerson.save() //save the new person to the database
//         console.log('data saved successfully')
//         res.status(200).json(response);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });

//     }
// })

// app.post('/menu', async (req, res) => {
//     try {
//         const data = req.body;
//         const newMenu = new MenuItem(data);
//         const response = await newMenu.save();
//         console.log('Data saved successfully')
//         res.status(200).json(response)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// // Get method to get the person
// app.get('/person', async (req, res) => {
//     try {
//         const data = await Person.find()
//         console.log('data fetched successfully')
//         res.status(200).json(data);

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// })

// app.get('/menu', async (req, res) => {
//     try {
//         const data = await MenuItem.find();
//         console.log('data saved successfully')
//         res.status(200).json(data)

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' })
//     }
// })


// app.get('/person/:workType', async(req, res) => {
//     try {
//         const workType = req.params.workType;
//         if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
//             const response = await Person.find({ work: workType });
//             console.log('response fetched');
//             res.status(200).json(response);
//         } else {
//             res.status(404).json({ error: 'Invalid work type' })
//         }

//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' })
//     }
// })

//Import routes
const personRoutes = require('./routes/personRoutes')
const menuItemRoutes = require('./routes/menuItemRoutes')
//use the router
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)


app.listen(3000, () => {
    console.log("Server is running on port 3000")
})