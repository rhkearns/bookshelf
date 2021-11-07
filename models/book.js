import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  text: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  }
}, {
  timestamps: true,
})

const noteSchema = new Schema({
  noteText: String,
}, {
  timestamps: true,
})

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
  status: String,
  owner: {type: Schema.Types.ObjectId, ref: 'Profile'},
  notes: [noteSchema],
  reviews: [reviewSchema],
})

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}