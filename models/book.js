import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  releaseYear: {
    type: Number,
    max: function() {
      return new Date().getFullYear()
    },
  },
  genre: [String],
  notes: String,
  series: String,
  finishedReading: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'}
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}