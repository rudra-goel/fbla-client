import { getLocationByID, getLocationsAdvancedSearch, likeLocation } from '../../actions/actions'
import React, { useEffect } from 'react'
import "./ReviewCard.css"
import { useState, setState} from 'react'

import {  CircularProgress, Grid } from '@material-ui/core'
import { useNavigate, useLocation} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import heart from  "../HeartButton.png"
import backbtn from  "../backButton.png"
import { keys } from '@material-ui/core/styles/createBreakpoints'
import { FaStar } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"


/*
Destructuring of the reviews on one location
Reviews : [
    {
        "Stars": # to indicate number of stars, 
        "NameOfReviewer": "Name of Reviewer", 
        "Review": "Their Review"
    },
    {
        "Stars": # to indicate number of stars, 
        "NameOfReviewer": "Name of Reviewer", 
        "Review": "Their Review"
    }, 
    {
        "Stars": # to indicate number of stars, 
        "NameOfReviewer": "Name of Reviewer", 
        "Review": "Their Review"
    }
]

Document Summary
Reviews: [ { JSON Object }, { JSON Object }, { JSON Object } ]
*/

function App({ review }){

    console.log("this component is getting invokd")
    console.log("this is the review in the new card i made")
    console.log(review)
    

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
