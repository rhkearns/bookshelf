import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shelfSchema = new Schema({
  shelfName: String,
})

const Shelf = mongoose.model('Shelf', shelfSchema)

export {
  Shelf
}