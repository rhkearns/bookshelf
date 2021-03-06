import mongoose from 'mongoose'

const Schema = mongoose.Schema

const shelfSchema = new Schema({
  shelfName: {
    type: String,
    max: 20,
  },
  description: String,
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
})

const Shelf = mongoose.model('Shelf', shelfSchema)

export {
  Shelf
}