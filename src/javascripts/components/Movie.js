import React, { useContext, useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import StarRating from './StarRating';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';
import { MovieContext } from './MovieList';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 50%)'
  }
};

export default function Movie(props){
  let { movies, setMovies } = useContext(MovieContext)
  let [modalOpen, setModalOpen] = useState(false)
  const history = useHistory()
  const onLike = props.onLike
  const m = props.movie
  const deleteMovie = () => {
    for(let i in movies){
      if(movies[i].id === movie.id) {
        movies.splice(+i, 1)
      }
    }

    setMovies([...movies])
    setModalOpen(false)
    history.push("/movies")
    toast("Movie Successfully Deleted")
  }
  return(
    <>
      <div className="card">
        <img src={m.poster} alt={m.title}/>
        <h2>{m.title}</h2>
          <p>{m.plot} <strong>Release Date</strong>: {format(m.releaseDate, 'MM/dd/yyyy')}</p>
        <ul className="extra">
          <li><StarRating />{m.rating}</li>
          <li><strong>{m.votes}</strong> votes</li>
          <li>
            <FaThumbsUp color="maroon" onClick={onLike}/> <small>{m.likes ? m.likes : 0 }</small>
          </li>
        </ul>
        <button className='primary' onClick={()=> history.push(`/movies/${m.id}/edit`)}>Edit</button>
        <button className='primary' onClick={()=> setModalOpen(true)}>Delete</button>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={()=> setModalOpen(false)} style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to delete this movie?</p>
        <button className='primary' onClick={deleteMovie}>Confirm Delete</button>
        <button className='primary' onClick={()=> setModalOpen(false)}>Cancel</button>      
      </Modal>
    </>
  )
}
  