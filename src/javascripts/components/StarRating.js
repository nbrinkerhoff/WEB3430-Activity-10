import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Movie from './Movie';
import { top10 } from '../top10';
import MovieList from "./MovieList";


export default function StarRating({totalStars = 5}) {
    const Star = ({ selected = false }) => (
        <FaStar color={selected ? "maroon" : "grey"} />
    );
    const createArray = length => [...Array(length)];
    const [selectedStars] = useState(4);
    return (
      <>
        {createArray(totalStars).map((n, i) => (
          <Star key={i} selected={selectedStars > i} />
        ))}
      </>
    );
  }

  //createArray[i] < Math.floor(MovieList.rating/2)-1
  //    const movieRating = (MovieList.rating)/2
