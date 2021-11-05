import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  releaseYear: {
    type: Number,
    max: 2021,
  },
  genre: [String],
  notes: [String],
  series: String,
  finishedReading: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}