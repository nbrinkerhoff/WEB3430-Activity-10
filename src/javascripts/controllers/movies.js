import {Movie, Movies} from '../models/movie'

// GET /api/movies
export const allMoviesAPI = (req, res, next) => {
    Movie.find().select('-reviews').exec((err, movies)=> {
        if(err){
            res.json({success: false, message: 'Query failed'})
            res.end()
        } else {
            res.write(JSON.stringify(movies))
            res.end()
        }
    })
}

// GET /api/movies/:id
export const oneMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err){
            res.json({success: false, message: 'Query failed'})
            res.end()
        } else {
            res.write(JSON.stringify(movie))
            res.end()
        }
    })
}


// POST /api/movies
export const createMovieAPI = (req, res, next) => {
    let movie = new Movie(req.body)
    movie.added_at = new Date()
    movie.updated_at = new Date()
    movie.save(err => {
        if(err){
            res.json({success: false, message: 'Movie creation failed'})
            res.end()
        } else {
            res.write(JSON.stringify(movie))
            res.end()
        }
    })
}

// PUT /api/movies/:id
export const updateMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err){
            res.json({success: false, message: 'Unable to update'})
            res.end()
        } else {
            Object.assign(movie, req.body)
            movie.updated_at = new Date()
            movie.save(err => {
                if(err){
                    res.json({success: false, message: 'Unable to update movie'})
                    res.end()
                } else {
                    res.write(JSON.stringify(movie))
                    res.end()
                }
            })
        }
    })
}


// DELETE /api/movies/:id
export const deleteMovieAPI = (req, res, next) => {
    Movie.find({_id: req.params.id}).select('-reviews').exec((err, movie)=> {
        if(err){
            res.json({success: false, message: 'Unable to update'})
            res.end()
        } else {
            Movie.findByIdAndDelete(req.params.id, err=> {
                if(err){
                    res.json({success: false, message: "Unable to delete movie"})
                    res.end()
                } else {
                    res.end()
                }
            })
        }
    })
}