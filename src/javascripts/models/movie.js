import mongoose from 'mongoose'

const Schema = mongoose.Schema


let reviewSchema = new Schema({
    comment: String,
    posted_at: Date
})


let movieSchema = new Schema({
    title: String,
    plot: String,
    poster: String,
    rated: String,
    rating: Number,
    votes: Number,
    genre: String,
    year: Number,
    imdbID: String,
    added_at: Date,
    updated_at: Date,
    reviews: [ reviewSchema ]
})

movieSchema.virtual('id').get(function(){
    return this._id.toHexString()
})


movieSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, options) => {
        delete ret._v
        delete ret._id
    }
})

export let Movie = mongoose.model("Movie", movieSchema)