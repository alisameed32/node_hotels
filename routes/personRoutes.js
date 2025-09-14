
const Menu = require('../models/Menu');
const Person = require('./../models/Person')
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data)

    const savedPerson = await newPerson.save();
    console.log("Data saved")
    res.status(200).json(savedPerson)

  } catch (error) {
    console.error('Error saving person: ', error)
    res.status(500).json({error: "Internal server error"})
  }
})

// getting data from db

router.get('/', async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data saved")
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal server error"})
  }
})


router.get('/:work', async (req, res) => {
  try {
    const work = req.params.work
    if (work == 'chef' || work == 'manager' || work == 'waiter'){
      const response = await Person.find({work: work})
      res.status(200).json(response)
    } else{
      res.status(404).json({error: 'Invalid work'})
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})


router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedPersonData = req.body
    const response = await Person.findByIdAndUpdate(id, updatedPersonData, {
      new: true,
      runValidators: true
    })

    if(!response){
      res.status(404).json({error: 'Person not found'})
    }

    console.log('Data Updated')
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await Person.findByIdAndDelete(id)

    if(!response){
      res.status(404).json({error: 'Person not found'})
    }

    console.log('Data Deleted')
    res.status(200).json({message: 'Person Deleted'})
    
  } catch (error) {
    console.error(error)
    res.status(500).json({error: "Internal Server Error"})
  }
})


module.exports = router;