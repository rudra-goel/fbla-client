/**
 * This is the landing page of the website
 * On every URL hit to www.viewrado.com/ --> this page is rendered
 * It essentially makes a GET request to the DBMS to ask for the first 20 locations within the database, it will then render those onto the main page
 * It contains the main banner at the top known as the NavBar
 * It then has a banner for the search option where users can search for the name of locations
 * On the left hand side are the advanced search menu options where users can apply filters to locations
 * On the right hand side, there loads the locations in the form of tiles
 * At the bottom, there is a Contance and Contributer section
 */

/**
 * The following are a series of import statements
 * 
 * The first is used as the styling for the webpage
 */
import './lpstyle.css'
/**
 * This import statement is used for the State Variable Manager
 * Essentially, we are able to load certain variables to this state and on every variable change, the page is rerendered
 */
import { useState } from 'react'
/**
 * The following two methods are imports to be able to forcefully navigate the user to different routes of the application
 * For example, when the user wishes to logou tof their account, their data is purged on the frontend, and they are redirected to the main page '/'
 */
import { useNavigate, useLocation } from 'react-router-dom'
/**
 * React is imported to make this a React Functional Component, or RFC
 * This allows for us to
 * 1. Make a function (App()) that returns HTML5 code --> on this, the program takes the return of the function, and renders it onto the webpage
 * 2. Allow for this to be added into a routes file so that the main route ('/') renders this page
 * 
 * useEffect is a React Hook that invokes certain actions whenever there are certain changes
 * This change is called the dependency array
 * For example: If the user wants to add a location to their liked list of locations, we want to update their profile 
 * ---> Their profile is updated only when a location gets hearted -> this is the use of the dependency array  
 */
import React, { useEffect } from 'react'
/**
 * useDispatch is another React Hook this is imported but it uses the capabilites of React Redux
 * This Redux and Dispatch system is a system to have variables be tracked onto the gloabl state meaning multiple files (webpages) can see and update the variables
 * We would want to tuse this to track variables that every component would need 
 * For example: In order for certain actions, certain components would need to have the User Profile variable be tracked
 */
import { useDispatch } from 'react-redux'
/**
 * The following are two methods that serve as middleman between the function and the API call to the backend server
 * The first method is to get locations on basic searches (searches being only for the names of the locations)
 * The second method is for searching locations based on advanced search filters (Such as Activity Type, Intensity, etc.)
 * They essentially parse through the data and ensure, that in the event of a DBMS failure, the webpage is not crashed
 */
import { getLocationsBasicSearch, getLocationsAdvancedSearch } from '../actions/actions'
/**
 * THis is another React component used to render all of the location card tiles
 * Essentially, this component is anothe RFC that takes in data and renders more HTML onto the webpage
 * The PARENT to this RFC is this current file
 */
import LocationCardContainer from './LocationCard/LocationCardContainer'
/**
 * Similar to above, this is another RFC that is used for pagination of the location tiles
 * It takes in data on the current page of the website, and it renders out more tiles based on the page number 
 * It returns HTML components so it is visible on the webpage
 */
import Pagination from './Pagination'
/**
 * This is a SVG image what is next to the search bar so users click it when they want to invoke a search
 */
import searchBtn from './SearchButton.png'

/**
 * This function is used to assist in pagination
 * It essentially grabs the entire URL as a string
 * It then casts the String into an object
 * @returns a URL Search Params Object
 */
function useQuery() {
    return new URLSearchParams(useLocation().search)
}

/**
 * This is the CRUX of the webpage because not only does it return the HTML code to render,
 * It contains the business logic for parsing through the search data and rendering new location tiles
 * @returns HTML 5 that renders into the web browser
 */
function App() {
    /**
     * This is a use for loading variables into the components state management system
     * We are loading a JSON Object that contains only the name of the location the user wishes to search for
     * By using the useState hook, we register the varibales into the components state 
     */
    const [postDataOnBasicSearch, setPostDataBasicSearch] = useState({ Name: '' })
    /**
     * This variable is used as the range value that appears ont he screen when the user wishes to search for locations based on a certain distance from a zip code
     */
    let rangeVal = 10;
    /**
     * Initialization of the Dispatch Hook
     */
    const dispatch = useDispatch()
    /**
     * Initialization of the Query Variable
     */
    const query = useQuery()
    /**
     * USing the functionn created above, we get the currentpage number the user is on
     * This is used for pagination and we pass this data into the GET requests to the backend server
     * If the user is on page 2 for example, we only load locations 4, 5, and 6 that appear in the database 
     */
    const page = query.get('page') || 1
    /**
     * Initialization o the useNavigate Hook
     */
    const history = useNavigate()
    /**
     * Here, we are pulling the user's information which is stored locally onto the clien;ts local storage
     * We are then registering that profile onto the components state management system so any changes allow for rerenders to the webpage
     */
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    /**
     * Initialization of the useLocation Hook
     */
    const location = useLocation()
    /**
     * This is the instance of using the useEffect Hook where certain lines of code are invoked when there is a change to the location that the user is on
     * Essentially, we are resetting the user's profile details every time they renavigate to a diferent part of the web application
     */
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    /**
     * The following lines of code are meant to parse through the correct data for the advanced search options
     * There is an array that contains all of the possible activity type options
     * 
     * Then, there are a series of delcared arrays that represent each type of filter to the query string
     * 
     * There is then another use of the react stathe manage - the postDataOnAdvancedSearch - that contains the query in JSON formatting
     * Each field of the format is tied to an array as the value of that field
     * that array is appended for later usage
     */
    const activities = ["AmusementParks", "Aquariums", "ArchaeologicalSites",
    "Arts", "Ballooning", "Botanical", "Breweries",
    "Casinos", "Certified", "Cideries", "Culinary",
    "Distilleries", "Ecotourism", "Factory Tours",
    "Farm", "Hot Springs", "Mines", "Museums", "National Monuments",
    "National Parks", "Pro Sports", "Rodeos and County Fairs",
    "Scenic Railways", "Spas", "State Parks", "Tours", "Yoga and Fitness"]

    let chbxActivities = []
    let ZIPFilterArray = []
    let CityArray = []
    let IntensityArray = []
    let audienceArray = []
    let priceMinMaxArray = []

    let [postDataOnAdvancedSearch, setPostDataOnAdvancedSearch] = useState({
        Checkbox: chbxActivities,
        Zip: ZIPFilterArray,
        City: CityArray,
        Intensity: IntensityArray,
        Audience: audienceArray,
        PriceRange: priceMinMaxArray
    })

    /**
     * This is a default setting used for the query of the different activity types
     * Essentially, if the user wishes to search for locations that only fall within a certain zipcode, the other fields of the query are filled with the string
     *  -- { '$exists': true } --
     * That is MongoDB specific in that it will search for items that have that field within each document --> ignoring all the other undesired query fields
     */
    chbxActivities.push({ '$exists': true })
    ZIPFilterArray.push({ '$exists': true })
    CityArray.push({ '$exists': true })
    IntensityArray.push({ '$exists': true })
    audienceArray.push({ '$exists': true })
    priceMinMaxArray.push({ '$exists': true })

    /**
     * The Middleman function call is made where we pass the data of the advanced search parameters
     * This middleman function calls the API and loads what the GET request returns into the REDUX global manager
     * That is then dispatched to the global state of variables so that every component of the application can access the locations that match the criteria
     */
    dispatch(getLocationsAdvancedSearch(postDataOnAdvancedSearch, page))

    /**
     * This function, similar to above, is responsible for searching locations only based on a simple search 
     * A simple ssearch is defined as a search that only searches for the name of locations
     * @param {HTML Object} event 
     */
    function handleSubmitBasicearch(event) {
        /**
         * This function is invoked everytime the user presses the search button in the main banner of the web page
         * The following code prevents the page fromm reloading - a default that is in on RFC applications and HTML Objects
         */
        event.preventDefault()
        /**
         * The search to the middleman is immediatly made and whatever is returned is loaded onto the gloabl state of variables
         * This global state is done through the dispatch feature
         */
        setPostDataBasicSearch({Name: document.getElementById("main-search-title").value})
        
        dispatch(getLocationsBasicSearch(postDataOnBasicSearch))//dispatches the action
    }

    /**
     * This function is responsible for invoking searchs that require advanced search features
     * @param {HTML Object} event 
     */
    function handleSubmitAdvancedSearch(event) {
        /**
         * Prevent the page for reloading
         */
        event.preventDefault()

        /**
         * Similar to above in that we are creating arrays for all the different search options
         * Essentially we are resetting the search options to be an empty query string
         */
        chbxActivities = []
        ZIPFilterArray = []
        CityArray = []
        IntensityArray = []
        audienceArray = []
        priceMinMaxArray = []
        /**
         * We are now resetting the query string by updating the state variable for the advanced search options
         */
        postDataOnAdvancedSearch = {
            Checkbox: chbxActivities,
            Zip: ZIPFilterArray,
            City: CityArray,
            Activity: IntensityArray,
            Audience: audienceArray,
            PriceRange: priceMinMaxArray

        }

        /**
         * The following lines of code all follow the same structure and purpose
         * 
         * They are meant to reference the HTML Input radio buttons
         *  --> if the radio button is pressed, it adds that specific search filter to that specific array
         *  --> if the radio is not clicked, it appends the { '$exists': true } object into the array
         * For activities, it iterates through the array declared above and sees if the boxes are checked or not
         */
        let counter = 0;
        activities.forEach((activity) => {
            //console.log(activity)
            if (document.getElementById(activity).checked) {
                chbxActivities.push(document.getElementById(activity).value)
                counter++
            }
        })

        if (counter == 0) { chbxActivities.push({ $exists: true }) }

        if (document.getElementById("radio1").checked) {
            ZIPFilterArray.push(rangeVal)
            ZIPFilterArray.push((document.getElementById("ZIPinput").value))
            CityArray.push({ $exists: true })
        } else if (document.getElementById("radio2").checked) {
            ZIPFilterArray.push({ $exists: true })
            CityArray.push((document.getElementById("city-input-box").value))
        } else {
            CityArray.push({ $exists: true })
            ZIPFilterArray.push({ $exists: true })
        }

        const demographic = ["adult", "family"]
        let demCounter = 0;
        demographic.forEach((status) => {
            if (document.getElementById(status).checked) {
                audienceArray.push(document.getElementById(status).value)
                demCounter++;
            }
        })
        if (demCounter == 0) {
            audienceArray.push({ $exists: true })
        }

        const intensities = ["intensityL", "intensityM", "intensityH"]
        let intensityCounter = 0
        intensities.forEach((intensity) => {
            if (document.getElementById(intensity).checked) {
                IntensityArray.push(document.getElementById(intensity).value)
                intensityCounter++
            }
        })
        if (intensityCounter === 0) {
            IntensityArray.push({ $exists: true })
        }
        if (document.getElementById("pricemin").value) {
            priceMinMaxArray.push(document.getElementById("pricemin").value)
        }
        if (document.getElementById("pricemax").value) {
            priceMinMaxArray.push(document.getElementById("pricemax").value)
        }
        /**
         * After all of the radio buttons and advanced filters have been checked, the state varibale of postDataOnAdvancedSearch is updated accordingly
         * That vairbale is then passed as an arguemtn to the middleman function to query the database through a GET request
         * Whatever locations are retruned are added to the global state of variables so other functions can later access them
         */
        setPostDataOnAdvancedSearch({
            Checkbox: chbxActivities,
            Zip: ZIPFilterArray,
            City: CityArray,
            Intensity: IntensityArray,
            Audience: audienceArray,
            PriceRange: priceMinMaxArray
        })
        dispatch(getLocationsAdvancedSearch(postDataOnAdvancedSearch, page))
    }
    /**
     * This function is used to logout the user
     * IF the user clicks the logout button, this function is invoked
     */
    const logout = () => {
        /**
         * The user profile details are removed through the global state of variables
         * Through the dispatch actions
         */
        dispatch({ type: "LOGOUT" })
        /**
         * The user is forcefully redirected ot the landing page of the applications
         */
        history('/')
        /**
         * The local details of the user are set to null by uptading the user's details
         */
        setUser(null)
    }
    /**
     * This function is used to manage the progress slider bar for the ZIP filter
     * Everytime a movement is detected on the ranger, this function is invoked
     * It essentially reads what value the slider is on, and it updated a state variable to match that
     * Additionally, the HMTL Labels next to the slider are updated for a better UX
     */
    function handleRangerAction(){
        /**
         * Getting a reference to the HTML Object of the Label that reads the value of the range slider
         */
        const displayRangeValue = document.getElementById("rangeValueID")
        /**
         * Getting a reference to the HTML Object of the range value slider
         */
        const inputRange = document.getElementById("slider");
        /**
         * If the code was able to successfully pick up the references, it will then add an event listener to the range slider
         * Meaning, everytime the range slider is moved, it will execute the code beneathe it
         */
        if(displayRangeValue && inputRange){
            inputRange.addEventListener('input', ()=> {
                /**
                 * We: 
                 *  --> Grab the value of the sldier
                 *  --> update the state varibale of the new value
                 *  --> change the label to read the new value of the slider using innerHTML props
                 */
                let value = inputRange.value
                rangeVal = value;
                displayRangeValue.innerHTML = value;
            }, false)
        }
    }


    return (
        <div onL>
            <body>
                <div class="navbar">
                    <div class="container">
                        <nav>
                            <div class="logoimg">
                            </div>
                            <a class="logo" >View<span>Rado</span></a>

                            <div class="top-left">
                                <a class="return-home" href="/" >Home</a>
                                <a class = "faq" href = "/faqs" >FAQs</a>
                            </div>
                            <div class="myAcc">
                                {user?.result ? (
                                    <a class="myacc" href='/myAccount'>Account Page</a>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                            <div class="top-right">

                                {user?.token ? (
                                    <div class="if-logged-in-navbar">
                                        <label>Hello {user.result.name}!</label>
                                        <button class="logout" value="logout" onClick={logout}>Logout</button>
                                    </div>

                                ) : (
                                    <div class="if-not-logged-in-navbar">
                                        <a class="login" href="/login">Login</a>
                                        <a class = "register" href = "/register">Register</a>
                                    </div>
                                )}

                            </div>

                        </nav>
                    </div>
                </div>

                <section class="hero">

                    <div class="search-bar">

                        <div class='search-bar-card'>

                            <label class='main-searchbar-title'>VIEWRADO</label>
                            <form onSubmit={handleSubmitBasicearch}>
                                <div class='main-searchbar-input-and-button'>
                                    <input class='main-searchbar' name="main-search-title" type='text' placeholder='Search Specific Destination' id='main-search-title'></input>
                                    <button class='main-search-btn' type='submit' id='main-search-title'>
                                        <img src={searchBtn} alt="Search" width="35" height="35"></img>
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>

                    <div class='bottom-hero'>
                        <div class="left-hero">

                            <form onSubmit={handleSubmitAdvancedSearch}>
                                <div class="search-criteria">
                                    <div class="container">
                                        <label class="SC-name">Search Filters</label>
                                    </div>
                                    <div class="input-criteria-container">
                                        <div>
                                            <label class="activities">Filter by Activities</label><br></br>
                                            <div class="checkbox-search-criteria">
                                                <input type="checkbox" id="AmusementParks" name="Amusement Parks, Play Centers, and Indoor Entertainment" value="Amusement Parks, Play Centers and Indoor Entertainment"></input>
                                                <label for="AmusementParks">Amusement Parks, Play Centers, and Indoor Entertainment</label><br></br>
                                                <input type="checkbox" id="Aquariums" name="Aquariums and Zoos" value="Aquariums and Zoos"></input>
                                                <label for="Aquariums">Aquariums and Zoos</label><br></br>
                                                <input type="checkbox" id="ArchaeologicalSites" name="Archaeological Sites" value="Archaeological Sites"></input>
                                                <label for="ArchaeologicalSites">Archaeological Sites</label><br></br>
                                                <input type="checkbox" id="Arts" name="Arts Activities" value="Arts Activities"></input>
                                                <label for="Arts">Arts Activities</label><br></br>
                                                <input type="checkbox" id="Ballooning" name="Ballooning and Aerial Sightseeing" value="Ballooning and Aerial Sightseeing"></input>
                                                <label for="Ballooning">Ballooning and Aerial Sightseeing</label><br></br>
                                                <input type="checkbox" id="Botanical" name="Botanical Gardens" value="Botanical Gardens"></input>
                                                <label for="Botanical">Botanical Gardens</label><br></br>
                                                <input type="checkbox" id="Breweries" name="Breweries" value="Breweries"></input>
                                                <label for="Breweries">Breweries</label><br></br>
                                                <input type="checkbox" id="Casinos" name="Casinos" value="Casinos"></input>
                                                <label for="Casinos">Casinos</label><br></br>
                                                <input type="checkbox" id="Certified" name="Certified Creative Districts" value="Certified Creative Districts"></input>
                                                <label for="Certified">Certified Creative Districts</label><br></br>
                                                <input type="checkbox" id="Cideries" name="Cideries" value="Cideries"></input>
                                                <label for="Cideries">Cideries</label><br></br>
                                                <input type="checkbox" id="Culinary" name="Culinary Experiences" value="Culinary Experiences"></input>
                                                <label for="Culinary">Culinary Experiences</label><br></br>
                                                <input type="checkbox" id="Distilleries" name="Distilleries" value="Distilleries"></input>
                                                <label for="Distilleries">Distilleries</label><br></br>
                                                <input type="checkbox" id="Ecotourism" name="Ecotourism" value="Ecotourism"></input>
                                                <label for="Ecotourism">Ecotourism</label><br></br>
                                                <input type="checkbox" id="Factory Tours" name="Factory Tours" value="Factory Tours"></input>
                                                <label for="Factory Tours">Factory Tours</label><br></br>
                                                <input type="checkbox" id="Farm" name="Farm" value="Farm and Ranch Activities"></input>
                                                <label for="Farm">Farm and Ranch Activities</label><br></br>
                                                <input type="checkbox" id="Hot Springs" name="Hot Springs" value="Hot Springs"></input>
                                                <label for="Hot Springs">Hot Springs</label><br></br>
                                                <input type="checkbox" id="Mines" name="Mines and Gold Panning" value="Mines and Gold Panning"></input>
                                                <label for="Mines">Mines and Gold Panning</label><br></br>
                                                <input type="checkbox" id="Museums" name="Museums" value="Museums"></input>
                                                <label for="Museums">Museums</label><br></br>
                                                <input type="checkbox" id="National Monuments" name="National Monuments" value="National Monuments"></input>
                                                <label for="National Monuments">National Monuments</label><br></br>
                                                <input type="checkbox" id="National Parks" name="National Parks" value="National Parks"></input>
                                                <label for="National Parks">National Parks</label><br></br>
                                                <input type="checkbox" id="Pro Sports" name="Pro Sports" value="Pro Sports"></input>
                                                <label for="Pro Sports">Pro Sports</label><br></br>
                                                <input type="checkbox" id="Rodeos and County Fairs" name="Rodeos and County Fairs" value="Rodeos and County Fairs"></input>
                                                <label for="Rodeos and County Fairs">Rodeos and County Fairs</label><br></br>
                                                <input type="checkbox" id="Scenic Railways" name="Scenic Railways" value="Scenic Railways"></input>
                                                <label for="Scenic Railways">Scenic Railways</label><br></br>
                                                <input type="checkbox" id="Spas" name="Spas" value="Spas"></input>
                                                <label for="Spas">Spas</label><br></br>
                                                <input type="checkbox" id="State Parks" name="State Parks" value="State Parks"></input>
                                                <label for="State Parks">State Parks</label><br></br>
                                                <input type="checkbox" id="Tours" name="Tours" value="Tours"></input>
                                                <label for="Tours">Tours</label><br></br>
                                                <input type="checkbox" id="Yoga and Fitness" name="Yoga and Fitness" value="Yoga and Fitness"></input>
                                                <label for="Yoga and Fitness">Yoga and Fitness</label><br></br>
                                            </div>
                                        </div>

                                        <div class="search-intensity">
                                            <label class="intensity">Filter by Activity Intensity Level</label><br></br>
                                            <input type="radio" name="search-intensity" id="intensityL" value="Low" ></input>
                                            <label for="intensityL">Low</label>
                                            <input type="radio" name="search-intensity" id="intensityM" value="Medium"></input>
                                            <label for="intensityM">Medium</label>
                                            <input type="radio" name="search-intensity" id="intensityH" value="High"></input>
                                            <label for="intensityH">High</label>
                                        </div>
                                        <div class="search-location">

                                            <label class="location">Filter by Location</label><br></br>
                                            <input type="radio" name="search-location" id="radio1"></input>
                                            <label for="radio1">Filter by range to ZIP Code</label>
                                            <br></br>
                                            <input type="radio" name="search-location" id="radio2"></input>
                                            <label for="radio2">Filter by city search</label><br></br>

                                            <div class="location-search-slider">
                                                <input type="range" id="slider" defaultValue="10" min="1" max="100" onChange={handleRangerAction()}/>
                                                <br></br>
                                                <div class="miles-paragraph">
                                                    <label id="rangeValueID">10</label>
                                                    <label class="many-miles"> miles radius from</label>
                                                </div>                                                
                                                <input class="zip-input" type="text" placeholder="ZIP Code" id="ZIPinput"></input>
                                            </div>

                                            <div class="location-search-name">
                                                <label for="city-input-box">City:</label>
                                                <input type="text" class="city-input-box" id="city-input-box" placeholder="City Name"></input>
                                            </div>
                                        </div>

                                        <div class="demographic">
                                            <div class="Audience">
                                                <label class="name-age">Filter by Audience</label><br></br>
                                                <input type="radio" id="adult" name="Audience" value="Adult"></input>
                                                <label for="adult">Adults Only</label><br></br>
                                                <input type="radio" id="family" name="Audience" value="Family"></input>
                                                <label for="family">Family</label><br></br>
                                            </div>
                                            <div class="cost">
                                                <div class="Price Range">
                                                    <label class="price">Filter by Price Range</label><br></br>
                                                    <input type="number" id="pricemin" placeholder="Price Min" min="0" max="1000"></input>
                                                    <input type="number" id="pricemax" placeholder="Price Max" min="0" max="1000"></input>
                                                </div>
                                            </div>

                                            <br></br>

                                            <div class="search-btn">
                                                <button type='reset' class="search-btn">Clear Form</button>
                                                <button class="search-btn" type="submit" id="apply-search-filter-btn">Apply Filters</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </form>
                            <div class="pagination-bar">
                                <Pagination pageNum={page} query={postDataOnAdvancedSearch} />
                            </div>
                        </div>
                        <div class='location-card'>
                            <LocationCardContainer />
                        </div>
                    </div>
                </section>

                <section class="contact-info">
                    <div class="container">
                        <table>
                            <tr>
                                <th>Contact Us</th>
                                <td>contact.viewrado@gmail.com</td>
                            </tr>
                            <tr class="contact-right">
                                <th>Contributors</th>
                                <div class="contributor">
                                    <td>Mimi Rai</td>
                                    <td>Rudra Goel</td>
                                </div>
                            </tr>
                        </table>
                    </div>
                </section>
            </body>
        </div>
    )
}


/*
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
*/
export default App;
