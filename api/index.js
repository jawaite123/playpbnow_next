'use strict'

const mongoose = require('mongoose')
const Place = require('./Place')
const express = require('express')

module.exports = db => {
  const router = express.Router()

  const wrapAsync = handler => (req, res) => handler(req)
    .then(result => res.json(result))
    .catch(error => res.status(500).json({ error: error.message }))

  router.get('/', wrapAsync(async function(req) {
    return Place.find()
  }))

  router.post('/', wrapAsync(async function(req) {
    const book = new BookType(req.body)
    await db.collection('Book').insertOne(book)
    return { book }
  }))

  router.delete('/:id', wrapAsync(async function(req) {
    const { result } = await db.collection('Book').deleteOne({
      _id: Archetype.to(req.params.id, ObjectId)
    })
    return { result }
  }))

  return router
}