import React, { createContext, useState, useEffect } from "react";
import Movie from "./Movie";
import { Switch, Route, Link, Redirect, useHistory } from "react-router-dom";
import { About, ErrorNotFound } from "./Pages";
import { MovieForm } from "./MovieForm";


export const MovieContext = createContext()

export default function MovieList() {
  const [movies, setMovies] = useState()
  const history = useHistory();

  useEffect(() => {
    fetch("/api/movies", {
      credentials: 'same-origin'
    })
    .then(response => response.text())
    .then((data) => {
      setMovies(JSON.parse(data, (key, value) => {
        const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
        // Explanation of the above string of... things...
        // ^ = marks the beginning of the string
        // \d{4}- = Look for a value that starts with 4 digits for the year
        // - = followed by a dash
        // \d{2} = followed by 2 digits for the month
        // - = followed by a dash
        // \d{2} = followed by 2 digits for the day
        // T = represents that the string will have a time component
        // \d{2} = represents the hours
        // : = separator for the time
        // \d{2} = represents the minutes
        // : = separator for the time
        // .* = a couple of characters (.* means any character after that(?))
        // Z = ends the datestring with a Z
        // $ = marks the end of the datestring
        if(typeof value === "string" && dateFormat.test(value)){ 
          // && = AND
          return new Date(value)
          // don't return the value itself. return a "date of it"
        }
        // Below is essentially a statement saying if it is not the case then do that.
        return value
      }))
    })
    .catch(console.error)
    // Empty array below is put there in order to not constantly call the .dat file. making it consume less power and resources. It does this by essentially asking useEffect to use the fetch once.
  }, [])

  if(!movies){
    return <p>Loading...</p>
  }
    return(
      <MovieContext.Provider value={{movies, setMovies}}>
        <div class="pull-content-right">
          <Route path="/movies">
            <button className="primary" onClick={
              () => {
                movies.sort((a, b) => a.rating - b.rating)
                setMovies(movies.map(m => m))
              }
            }>Sort</button>
            <button className="primary" onClick={()=> history.push("/movies/new")}>Add a new movie</button>
          </Route>
        </div>
        <main>
          
          <Switch>
            <Route exact path="/movies">
              {movies.map((m, i) => {
                return <Movie key={m.id} movie={m} onLike={
                  () => {
                    movies[i].likes = movies[i].likes ? movies[i].likes + 1 : 1

                    setMovies(movies.map(m => m))
                  }
                }/>
              })}
              
            </Route>
            <Route path="/movies/new"><MovieForm/></Route>
            <Route path="/movies/:mid/edit"><MovieForm/></Route>
            <Redirect from="" to="/movies"/>
            <Route path="*"><ErrorNotFound/></Route>
          </Switch>
        </main>
      </MovieContext.Provider>
    )
}