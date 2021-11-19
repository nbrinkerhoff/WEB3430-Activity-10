import React from 'react'
import MovieList from './MovieList'
import { BrowserRouter as Router } from 'react-router-dom'


export default function Main() {
    return (
        <Router>
            <MovieList/>
        </Router>
    )
}