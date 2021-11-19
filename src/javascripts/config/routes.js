import express from 'express'

import { aboutPage, contactPage, indexPage, signInPage, signUpPage } from '../controllers/index'
import { contactAPI } from '../controllers/contact'
import { allMoviesAPI, oneMovieAPI, createMovieAPI, updateMovieAPI, deleteMovieAPI } from '../controllers/movies'
import { registerUserAPI, signUserInAPI } from '../controllers/users'
import jwt from 'jsonwebtoken'
import { APP_SECRET } from './vars'
let router = express.Router()

function isSignedIn(req){
    try {
        jwt.verify(req.cookies.token, APP_SECRET)
        return true
    }catch(err){
        return false
    }
}

export function configureRoutes(app){
    app.all('*', (req, res, next)=>{
        app.locals.signedIn = isSignedIn(req)
        next()
    })
    router.get('/', indexPage)
    router.get('/about', aboutPage)
    router.get('/contact', contactPage)
    router.get('/signin', signInPage)
    router.get('/signup', signUpPage)
    
    router.get('/movies*', indexPage)
    router.get('/register', indexPage)
    router.get('/signin', indexPage)

    // Movies API Endpoints
    router.get('/api/movies', allMoviesAPI)
    router.get('/api/movies/:id', oneMovieAPI)
    router.post('/api/movies', createMovieAPI)
    router.put('/api/movies/:id', updateMovieAPI)
    router.delete('/api/movies/:id', deleteMovieAPI)

    // Users
    router.post('/api/users/register', registerUserAPI)
    router.post('/api/users/signin', signUserInAPI)
    router.post('/api/contact', contactAPI)

    app.use('/', router)
}