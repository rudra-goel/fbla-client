import './location.css'

import { getLocationByID, getLocationsAdvancedSearch, likeLocation, postReview } from '../../actions/actions'
import React, { useEffect } from 'react'
import { useState, setState} from 'react'

import {  CircularProgress, Grid } from '@material-ui/core'
import { useNavigate, useLocation} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import heart from  "../HeartButton.png"
import backbtn from  "../backButton.png"
import { keys } from '@material-ui/core/styles/createBreakpoints'
import ReviewCard from './ReviewCard'
import { FaStar } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai"


function App(){

    const dispatch = useDispatch()
    const { id } = useParams()

    //dispatch(getLocationByID(id))
    
    const history = useNavigate()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'
    console.log("the state of the user is")
    console.log(user)
    const window = useLocation()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))

    }, [window])

    let location

    location = JSON.parse(localStorage.getItem('locations'))
    console.log("in te individual place")
    console.log(location)
    let details
    //console.log(location)
    //get the correct locaiton to detail
    if (location.places && (location.places?._id || location.places.length===1 || location.places?.data)){
        if (location.places?._id) details = location.places
        else if (location.places.length===1) details = location.places[0]
        else if (location.places?.data._id) details = location.places.data
    }else{
        const ids = [...Array(location.places.length)]
        for (let i = 0; i < ids.length; i++){
            ids[i] = location.places[i]._id
        }
        //const ids = [location.places[0]._id, location.places[1]._id, location.places[2]._id]
        //console.log(ids)
        for (let i = 0; i < ids.length; i++){
            if (id == ids[i]){
                details = location.places[i]
            }
        }
    }
    console.log("this is the details i just wrote")
    console.log(details)
    
    
    //access the url and other fields that are not one word from the object
    let url
    
    for (const key in details){
        if (typeof details[key] == 'string' && details[key].substring(0, 4) == 'http'){
            url = details[key]
        }
    }
    let PriceMin
    for (const key in details){
        if (key == 'Price Min'){
            PriceMin = details[key]
        }
    }
    let PriceMax
    for (const key in details){
        if (key == 'Price Max'){
            PriceMax = details[key]
        }
    }
    let indoorOutdoor
    for (const key in details){
        if (key == 'Indoor/Outdoor'){
            indoorOutdoor = details[key]
        }
    }
    let suitableFor
    for (const key in details){
        if (key == 'Family/Adult Only/Children Only'){
            suitableFor = details[key]
        }
    }
    let intensity
    for (const key in details){
        console.log("key")
        console.log(key)
        if (key == 'Activity Intensity (L, M, H)'){
            intensity = details[key]
        }
    }
    intensity = intensity.toLowerCase()

    const [reviews, setReviews] = useState({listOfReviews: [...details.Reviews]})

    console.log("LIST OF REVIEWS")
    console.log(reviews)
    const imageString = `data:image/jpeg;base64,${details.Base64String}`
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history('/')
        setUser(null)
    }
    const [review, setReview] = useState({
        numStars:0, 
        NameOfReviewer:"",
        givenReview:"",
        title:""
    })


    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [hoverHeart, setHoverHeart] = useState(false)
    try {
        
        const [hoverHeart, setHoverHeart] = useState(user?.result.likedLocations.includes(id) ? true : false)
    } catch (error) {
        console.log(error)
    }
    
    
    const handleReview = () => {
        try {
            dispatch(postReview(details.Name, review))
            reviews.listOfReviews.push(review)
            setReviews({listOfReviews: reviews.listOfReviews})
            
        } catch (error) {
            console.log(error)
        }
    }
    let likeCount = [0, 0, 0, 0, 0]
    reviews.listOfReviews.forEach(individualReview => {
        switch(individualReview.Stars) {
            case 1:
                likeCount[0]++
                break;
            case 2:
                likeCount[1]++
                break;
            case 3:
                likeCount[2]++
                break;
            case 4:
                likeCount[3]++
                break;
            case 5:
                likeCount[4]++
                break;
        }
    })
    let starPercentages = [0, 0, 0, 0, 0]
    const totalReviews = reviews.listOfReviews.length
    likeCount.forEach((numStars, i) => {
        starPercentages[i] = (numStars/totalReviews)*100
        starPercentages[i] = Math.round(starPercentages[i] * 10) / 10
    })
    console.log("THE SCORE/STAR DISTRIBUTIONS as %")
    console.log(starPercentages)
    console.log("THE SCORE/STAR DISTRIBUTIONS as number")
    console.log(likeCount)

  return (
      !location ? <CircularProgress /> : 
    <body class="body">
        <div class="navbar">
            <div class="container">
            <nav>
                        <a class="logo">View<span>Rado</span></a>
                        <div class = "top-left">
                                <a class = "return-home" href = "/" >Home</a>
                                <a class = "faq" href = "/faqs" >FAQs</a>
                                {user?.token ? (
                                    <a class="myacc" href='/myAccount'>Account Page</a>                                
                            ) : (
                                <div class="if-not-logged-in-navbar">
                                </div>
                            )}
                        </div>
                        
                        <div class = "top-right">

                            {user?.token ? (
                                <div class="if-logged-in-navbar">
                                    <label>Hello {user.result.name}!</label>
                                    <button value = "logout" onClick = {logout}>Logout</button>
                                </div>
                                
                            ) : (
                                <div class="if-not-logged-in-navbar">
                                    <a class = "login" href = "/login">Login</a>
                                    <a class = "register" href = "/register">Register</a>
                                </div>
                            )}
                            
                        </div>        

                    </nav>
            </div>
        </div>
        <section class='hero'>
            <div class='heart-and-back-btn'>
                <a href='/'>
                    <img src={backbtn} alt="Logo" width="20" height ="25"></img>
                </a>
                
                <button class='heart' type='submit' >
                    {!user?.result ? <label>Login to save locations!</label> : 
                    <div class = "heart-button">
                        <button class = "heart-button-like-location" onClick={likeLocation({locationId: details._id, userId: user.result._id})}>
                            <AiFillHeart 
                                size={40} 
                                className = "heart-button"
                                color={hoverHeart ? "#f91a68" : "#000000"}
                                onMouseEnter={() => setHoverHeart(true)}
                                onMouseLeave={() => setHoverHeart(false)}
                            />
                        </button>
                    </div>
                    }
                    
                </button>
                
            </div>
            
            <div class='main-hero'>
            
                <div class="image-for-destination">
                    <img class = "image" src = {imageString}></img>
                </div>
                

                <div class='destination-info'>

                    <div class='destination-name'>
                        <label class='destination-name'>{details.Name}</label>
                    </div>
                    
                    <div class='destination-description'>
                        <label class='destination-description'>{!details.Description ? <div><p>Description not found!</p><p> Contact us to be the first to input a description</p></div> : details.Description}</label>
                    </div>
                    <div class='contact-and-location'>
                        <label>Reach out to them at: </label>
                        <label>{details.Phone}</label><br></br>
                        <div class="location-address">
                            <label class='location'>Located at {details.Address} {details.City}, {details.Sate} - {details.Zip}</label>
                        </div>
                    </div>
                    <div class='criteria-of-destination'>
                        <h5>Criteria of Destination</h5>
                        <ul>
                            <li>Categories: {details.Categories}</li>
                            <li>{indoorOutdoor} Activity</li>
                            <li>Price Range: {!PriceMin && !PriceMax ? <p>Not Applicable</p>: <label>{PriceMin} - {PriceMax}</label>}</li>
                            <li>Most suitable for {!suitableFor ? <p>All Ages</p> : suitableFor}</li>
                            <li>Most find this location with a {intensity} intensity</li>

                        </ul>
                    </div>
                    
                    <div class='link-to-website'>
                        <a href={url} target = "_blank">Visit Webste : {!url ? <p>Url Not avaliable</p> : url}</a>
                        
                    </div>
                    
                </div>

            </div>
            <div class="review-section">
                    <h1>Reviews</h1>
                    <div class="written-and-general-review">

                        <div class="user-writes-review">
                            {user?.token ? (
                                <div class="make-a-review">
                                    <div class="star">
                                        {[...Array(5)].map((star, i) => {
                                            const ratingValue = i+1;

                                            return (
                                            <label>
                                                <input class = "star-radio" type="radio" name = "rating" value = {ratingValue} onClick={() => setRating(ratingValue)}></input>
                                                <FaStar 
                                                    className="star" 
                                                    color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                                    size={40} 
                                                    onMouseEnter={() => setHover(ratingValue)}
                                                    onMouseLeave={() => setHover(null)}
                                                />
                                            </label>
                                            )
                                        })}
                                    </div>
                                    <input type="text" value={review.title} class="title-of-review" placeholder='Review Title' onChange={(e)=>setReview({...review, title: e.target.value})}></input>
                                    <textarea id="review" class = "writing-area" name="review-box" onChange = {(e) => setReview({...review, Stars: rating, NameOfReviewer: user.result.name, givenReview: e.target.value})} rows="5" cols="50"></textarea>
                                    <button type="submit" class="review-submit" onClick={ handleReview }>Post Review</button>
                                    
                                </div>
                                ) : (
                                    <div class='if-not-logged-in-review'>
                                        <p1>Register or login to post a review</p1>
                                    </div>
                            )}
                        </div>
                        <div class="general-review">
                            
                            <h2>Overall Ratings: { reviews.listOfReviews.length } </h2>
                            {
                                totalReviews === 0 ? 
                                <div class="distributions-not-available">
                                    <p1 class="distributions-not-available">Overall distributions not available because there are no reviews</p1>
                                 </div>
                                 : (

                                    <table class="review-distributions">
                                        <tr>
                                            <th>5</th>
                                            <th>
                                                <progress class="progress-slider-review"  value={starPercentages[4]} max={100}></progress>
                                            </th>
                                            <th>{`${starPercentages[4]}%`}</th>
                                        </tr>
                                        <tr>
                                            <th>4</th>
                                            <th>
                                                <progress class="progress-slider-review" value={starPercentages[3]} max={100}></progress>
                                            </th>
                                            <th>{`${starPercentages[3]}%`}</th>
                                        </tr>
                                        <tr>
                                            <th>3</th>
                                            <th>
                                                <progress class="progress-slider-review" value={starPercentages[2]} max={100}></progress>
                                            </th>
                                            <th>{`${starPercentages[2]}%`}</th>
                                        </tr>
                                        <tr>
                                            <th>2</th>
                                            <th>
                                                <progress class="progress-slider-review" value={starPercentages[1]} max={100}></progress>
                                            </th>
                                            <th>{`${starPercentages[1]}%`}</th>
                                        </tr>
                                        <tr>
                                            <th>1</th>
                                            <th>
                                                <progress class="progress-slider-review" value={starPercentages[0]} max={100}></progress>
                                            </th>
                                            <th>{`${starPercentages[0]}%`}</th>
                                        </tr>
                                        
                                    </table>
                                )
                            }
                        </div>
                    </div>
                    <div class="written-reviews">
                        <h2>Top Reviews</h2> 

                        {   
                            reviews.listOfReviews.length !=0 ? (
                                reviews.listOfReviews.map(reviewArgument => {

                                    console.log("SECOND review")
                                    console.log(reviewArgument)

                                    return (
                                        <ReviewCard review = {reviewArgument} />
                                    )
                                })

                            ) : (
                                <p1>Be the First to Review!</p1>
                            )
                        }
                    </div>
            </div>
        </section>

        <section class='contact-info'>
            <div class="container">
                <div class="contact-left">
                    <h5>Contact Us</h5>git 
                    <ul>
                        <li>Name</li>
                        <li>Email</li>
                        <li>Number</li>
                    </ul>
                </div>
                <div class="contact-right">
                    <h5>Contributers</h5>
                    <ul class="contributer">
                        <li>Person1</li>
                        <li>Person2</li>
                    </ul>
                </div>
        
            </div>
        </section>
    </body>
    );
}

export default App;
