import React, { useState, useEffect } from 'react'
import { queryLocationByID } from "../../Firebase/firestore-query"
import { ref, getDownloadURL } from "firebase/storage"
import { storage } from '../../Firebase/firebase-config'
import { CgProfile } from "react-icons/cg"
import { FaStar } from "react-icons/fa"

import "./Review.css"
function Review({ individualReview, number }) {
    /**
     * This location variable holds data about the location on which th9e review was made
     */

    const [location, setLocation] = useState("")
    const [image, setImage] = useState('')
    
    useEffect(async () => {
        async function getLocation() {
            let result = await queryLocationByID(individualReview.location)
            setLocation(result)
        }

        if(location === ""){
            await getLocation()
        }
    }, [])
     


    getDownloadURL(ref(storage, `Images/${location.Categories}.jpg`))
        .then((url) => {
            
            setImage(url)
        })
    

  return (
    <div class="my-review-container">
        
        {/* <label>---------------------Details of the Location---------------------</label> */}
        <div class="left-section">

            <img class="activity-image" id="location-image" src={image} alt="Loading Image" ></img>

            <div class="location-details">
                <h3 class="review-location-name">{ location.Name }</h3>
                <label class="review-location-categories">Activity Type: {location.Categories}</label><br></br>
                <div class="average-star">

                    <label class="review-location-stars">Average Stars: {location.Stars}</label>
                    <div class = "stars">
                    {[...Array(5)].map((star, i) => {
                        const ratingValue = i+1;
                        
                        return (
                            <FaStar 
                            color={ratingValue <= location.Stars ? "#f4e525" : "#e4e5e9"} 
                            size={25}
                            />
                            )
                    })}
                    </div>
                </div>
            </div>
        </div>


        <div class="review-details">
            {/* <label>---------------------Details of the given review---------------------</label> */}
            <div class = "nameOfReviewer">
                <CgProfile size={30} />
                <p1 class = "reviewer-name">{individualReview.NameOfReviewer}</p1>
            </div>
            <div class = "given-stars">
                {[...Array(5)].map((star, i) => {
                    const ratingValue = i+1;

                    return (
                        <FaStar 
                            color={ratingValue <= individualReview.Stars ? "#f4e525" : "#e4e5e9"} 
                            size={25}
                        />
                    )
                })}
            </div>
            <div class="written-review">

                <div class="review-title-container">
                    <p1 class="review-title"><span>Review Title: </span>{ individualReview.title }</p1>
                </div>

                <div class="given-Review">

                    <p1 class = "givenReview"><b>Given Review:  </b><span>{individualReview.givenReview}</span></p1>
                </div>
            </div>
        </div>        
    </div>
  )
}

export default Review
