import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: String,
  avatar: String,
  books: [{type: Schema.Types.ObjectId, ref: 'Book'}],
  shelves: [{type: Schema.Types.ObjectId, ref: 'Shelf'}],
  }, {
  timestamps: true
})

const Profile = mongoose.model('Profile', profileSchema)

export {
  Profile
}