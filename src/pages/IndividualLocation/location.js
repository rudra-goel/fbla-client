/**
 * This file serves as the more indepth deatils page for each location
 * When the user clicks on a location tile from the main page, this page is rendered where the JSON data of the location is put into a more readable format
 * This page also includes the reviews section of the location -> this is a separate react component
 */
import './location.css'

/**
 * Two actions that are imported into the component 
 * 
 * The first action is meant to add the location to the user's list of liked locations
 * 
 * The second import is used to post a review when an authenticated user wishes to do so
 */
import { likeLocation, postReview } from '../../actions/actions'

/**
 * Importing React to allow the functional component to be added to the React Router Dom
 * The useEffect hook is imported to invoke a certain action with a dependency array
 * This means that every time a certain thing (variable, component, etc. ) changes, we can invoke certain actions
 * It is very similar to the onChange method in many input fields of HTML
 */
import React, { useEffect } from 'react'

/**
 * The useState hook is imported to uodate the page when certain variables or states change
 */
import { useState } from 'react'

/**
 * UX of a circular progress bar
 */
import {  CircularProgress } from '@material-ui/core'

/**
 * Both useNavigate and useLocation are used to renavigate the user to certain pages on certain requests
 */
import { useNavigate, useLocation} from 'react-router-dom'

/**
 * Dispatch is imported to manage the global state variables
 */
import { useDispatch } from 'react-redux'
/**
 * useParams is used to get strings from the URL parameters
 */
import { useParams } from 'react-router-dom'

/**
 * Image for the back button
 */
import backbtn from  "../backButton.png"

/**
 * React Component for the review card to be posted on each location
 */
import ReviewCard from './ReviewCard'

/**
 * React Icons imported for better UX
 */
import { FaStar } from "react-icons/fa"
import { AiFillHeart } from "react-icons/ai"



function App(){
    /**
     * Initilzation of dispatch object
     */
    const dispatch = useDispatch()

    /**
     * Pulling the location's ID via the parameters of the URL
     */
    const { id } = useParams()
    
    /**
     * Initilization of the useNavigate hook
     */
    const history = useNavigate()

    /**
     * We are pulling the user's data from the local storage of the client by the localstorage.getItem call
     * We are then setting a user variable to that data using the useSatte hook provided by React
     */
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    /**
     * Initialization of the useLocation hook
     */
    const window = useLocation()
    
    /**
     * Everytime the window object experiences a change, this useEffect hook will be invoked -> hence the dependency array
     * We are then setting the updated user with the updated information we are pulling from the local storage
     */
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [window])

    /**
     * Here we are pulling all the locations from the local storage
     * The next lines in essence will parse through the different possible kinds of the JSON data and format it properly into the details variable
     */
    let location
    location = JSON.parse(localStorage.getItem('locations'))

    let details

    if (location.places && (location.places?._id || location.places.length===1 || location.places?.data)){

        if (location.places?._id) details = location.places

        else if (location.places.length===1) details = location.places[0]

        else if (location.places?.data._id) details = location.places.data

    } else{
        /**
         * This section is only invoked when there are multiple locations and we have to find the correct one to display
         */
        const ids = [...Array(location.places.length)]

        for (let i = 0; i < ids.length; i++){
            ids[i] = location.places[i]._id
        }

        for (let i = 0; i < ids.length; i++){
            /**
             * We are checking the ID from the params and seeing which one it is in the list of possible IDs
             */
            if (id == ids[i]){
                details = location.places[i]
            }
        }
    }

    /**
     * Because the database has JSON data that is not stored with fields as one word, we cannot use dot notation to access the value of the fields with two words.
     * We must use for loops and compare the fields as variable references to strings
     * 
     * For example, we are setting the URL variable equal only to the field with the "website URL" and finding that with the substring of HTTP
     */
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
        if (key == 'Activity Intensity (L, M, H)'){
            intensity = details[key]
        }
    }
    intensity = intensity.toLowerCase()

    /**
     * Using the state varibale system to track all of the reviews attached to one location
     * It is initially a JSON Object with te one field as an array that is already populated with the existing JSON objects of each review
     */
    const [reviews, setReviews] = useState({listOfReviews: [...details.Reviews]})

    /**
     * Propper formatting of the base64 string of the image for the HTML5 to read
     */
    const imageString = `data:image/jpeg;base64,${details.Base64String}`

    /**
     * This is a function invoked when the user wishes to logout
     * 
     * It first dispatches a type of logout to clear any of the user data in the global state variable system
     * 
     * We then redirect the user to the landing page with the history call
     * 
     * We then set the local user State to null
     */
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history('/')
        setUser(null)
    }
    /**
     * The state variables are used for one review tracking as well
     * When the user wishes to wriete a review, the following vields are updated dynamically and when the post review method is called
     * Each review has the following in the JSON format: number of stars, name of the reviewer, the given review, and the title of the review
     * This form of JSON is exactly posted to the database
     */
    const [review, setReview] = useState({
        numStars:0, 
        NameOfReviewer:"",
        givenReview:"",
        title:""
    })

    /**
     * Both the rating and the hover are used as state variables to track the user and the stars they award to the location
     * For each star they hover, the variable is updated to then update the css and make it filled in with Gold color
     */
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    /**
     * Similar to above, when the user hover's above the hear, it glows pink indicating they can heart it and save it to their account
     */
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

    /**
     * This array is meant to mimic the stars on the location to be displayed with each posted review
     * In essence, what it does is it parses through each review from the array of reviews on a location and it determines the number of stars
     * This array is then used to calculate the average distribution of stars accross the location
     * 
     * For Example: 
     *  If I gave 3 stars to one location, the 2nd index of the likeCount would be filled to 1
     *  If my friend also gave 3 stars on the same location, the likeCount at index 2 would be bumped to 2
     * 
     */
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
    /**
     * Using the star distributions above, the percentages of each star rating are calculated to be used for later
     * We calculate percentages by dividing the number of that star by the total number of reviewers
     */
    let starPercentages = [0, 0, 0, 0, 0]
    const totalReviews = reviews.listOfReviews.length
    likeCount.forEach((numStars, i) => {
        starPercentages[i] = (numStars/totalReviews)*100
        starPercentages[i] = Math.round(starPercentages[i] * 10) / 10
    })
    

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
                <h5>Contact Us</h5>
                            <ul>
                                <li>contact.viewrado@gmail.com</li>
                            </ul>
                        </div>
                        <div class="contact-right">
                            <h5>Contributers</h5>
                            <ul class="contributer">
                                <li>Mimi Rai</li>
                                <li>Rudra Goel</li>
                            </ul>
                </div>
        
            </div>
        </section>
    </body>
    );
}

export default App;
