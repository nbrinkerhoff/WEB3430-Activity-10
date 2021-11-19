// Required by Webpack - do not touch
// require.context('../', true, /\.(html|json|txt|dat)$/i)
require('../favicon.ico')
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)
require.context('../stylesheets/', true, /\.(css|scss)$/i)

//TODO - Your ES6 JavaScript code (if any) goes here
import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { ContactForm } from './components/ContactForm'
import { SignUpForm } from './components/SignUpForm'
import { SignInForm } from './components/SignInForm'

export default function StarRating({totalStars = 5}) {
    // const movieRating = (MovieList.rating)/2
    const Star = ({ selected = false }) => (
        <FaStar color={selected ? "maroon" : "grey"} />
    );
    const createArray = length => [...Array(length)];
    const [selectedStars] = useState(4);
    return (
      <>
        {createArray(totalStars).map((_n, i) => (
          <Star key={i} selected={selectedStars > i} />
        ))}
        <p>
          {selectedStars} of {totalStars} stars
        </p>
      </>
    );
  }


if (document.getElementById('main')){
  ReactDOM.render(<App/>, document.getElementById('main'))
}else if(document.getElementById('contact')){
  ReactDOM.render(<ContactForm/>, document.getElementById('contact'))
}else if(document.getElementById('signup')){
  ReactDOM.render(<SignUpForm/>, document.getElementById('signup'))
}else if(document.getElementById('signin')){
  ReactDOM.render(<SignInForm/>, document.getElementById('signin'))
}

if(document.querySelector('#_sign_user_out')){
  document.querySelector('#_sign_user_out').onclick = (e) => {
    let el = document.createElement('div')
    document.body.appendChild(el)
    ReactDOM.render(<SignOut/>, el)
  }
}