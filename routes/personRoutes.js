
const Menu = require('../models/Menu');
const Person = require('./../models/Person');
const express = require('express');
const router = express.Router();
const { jwtAuthMiddleware, genToken } = require('./../jwt');


router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const savedPerson = await newPerson.save();
    console.log("Data saved");

    const payLoad = {
      id: savedPerson.id,
      username: savedPerson.username
    }

    console.log(`Payload: ${payLoad}`);
    const token = genToken(payLoad);
    console.log("Token is: ", token);

    res.status(200).json({ response: savedPerson, token: token });

  } catch (error) {
    console.error('Error saving person: ', error);
    res.status(500).json({ error: "Internal server error" });
  }
})


// login route

router.post('/login', async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;

    // Find the user by username
    const user = await Person.findOne({ username: username });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payLoad = {
      id: user.id,
      username: user.username,
      email: user.email
    }

    const token = genToken(payLoad);

    // Send token in response
    res.json({ token })

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
  }
})


// profile routes 

router.get('/profile', jwtAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by id
    const user = await Person.findById(userId);

    // If user does not exist, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);


  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server error' });
  }
})

// getting data from db

router.get('/', jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Person Data Fetched");
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
})


router.get('/:work', async (req, res) => {
  try {
    const work = req.params.work;
    if (work == 'chef' || work == 'manager' || work == 'waiter') {
      const response = await Person.find({ work: work });
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: 'Invalid work' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
      new: true,
      runValidators: true
    })

    if (!response) {
      res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data Updated');
    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Person.findByIdAndDelete(id);

    if (!response) {
      res.status(404).json({ error: 'Person not found' });
    }

    console.log('Data Deleted');
    res.status(200).json({ message: 'Person Deleted' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})


module.exports = router;