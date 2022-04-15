/**
 * This file serves as the React Functional component for each review posted onto a location
 * It takes in the JSON data through props and parses it into a readable HTML format
 * 
 * The first import is used to setup the react component to allow it to recieve props
 */
import React from 'react'

/**
 * Used for styling the page
 */
import "./ReviewCard.css"
/**
 * This import is for the star icon that users and apply to reviews
 */
import { FaStar } from "react-icons/fa"
/**
 * This import is for the profile picture that appear next to each user's name in their review
 */
import { CgProfile } from "react-icons/cg"

/**
 * All React Components follow the same syntax where a function that contains certain business logic is created
 * The return of the function is the HTML that is rendered onto the webpage
 * This function notation allows for the re-render upon variable change
 * @returns HTML Body that is rendered onto the webpage
 */
function App({ review }){
  return (
      <div class="review-container">
          <div class="title">
            <p1>{ review.title }</p1>
            
          </div>
         
          <div class = "stars">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i+1;

                return (
                    <FaStar 
                        color={ratingValue <= review.Stars ? "#ffc107" : "#e4e5e9"} 
                        size={25}
                    />
                )
            })}
          </div>
          <div class = "nameOfReviewer">
              <CgProfile 
                size={30}
              />
            <p1 class = "name">{review.NameOfReviewer}</p1>
          </div>
          <div class="theReview">
            <p1 class = "givenReview">{review.givenReview}</p1>
          </div>

      </div>
    );
}

export default App;
