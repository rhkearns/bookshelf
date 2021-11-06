import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shelfSchema = new Schema({
  shelfName: String,
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}]
})

const Shelf = mongoose.model('Shelf', shelfSchema)

export {
  Shelf
}