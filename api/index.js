const express = require('express')
const router = express.Router()

router.get('/places', async (req, res) => {
  try {
    const Place = require('./Place')
    res.json( await Place.find({}) )
  }catch (err) {
     res.json({ error: err.message || err.toString() });
  }
})


module.exports = router
