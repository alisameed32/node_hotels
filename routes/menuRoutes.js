const express = require('express')
const router = express.Router();
const Menu = require('./../models/Menu')

router.post('/', async (req, res) => {
  try {
    const data = req.body
    const newMenu = new Menu(data)
    const saveMenu = await newMenu.save()
    console.log("Menu Saved")
    res.status(200).json(saveMenu)

  } catch (error) {
    console.error("Error: ", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get('/', async (req, res) => {
  try {
    const data = await Menu.find()
    console.log("Data fetched")
    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

router.get('/:taste', async (req, res) => {
  try {
    const taste = req.params.taste
    if (taste == 'Sweet' || taste == 'Spicy' || taste == 'Sour') {
      const data = await Menu.find({ taste: taste })
      console.log('Data fetched')
      res.status(200).json(data)
    } else {
      res.status(404).json({ error: 'Invalid taste' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updateMenu = req.body
    const response = await Menu.findByIdAndUpdate(id, updateMenu, {
      new: true,
      runValidators: true
    })

    if (!response) {
      res.status(404).json({ error: 'Menu not found' })
    }

    console.log("Menu Updated")
    res.status(200).json(response)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const response = await Menu.findByIdAndDelete(id)

    if (!response) {
      res.status(404).json({ error: 'Menu not found' })
    }

    console.log("Menu delete")
    res.status(200).json({ message: 'Menu Deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

module.exports = router