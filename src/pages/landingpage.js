import './lpstyle.css'//page styling
import { useState, setState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getLocationsBasicSearch, getLocationsAdvancedSearch } from '../actions/actions'
import LocationCardContainer from './LocationCard/LocationCardContainer'
import Pagination from './Pagination'

import searchBtn from './SearchButton.png'
import homeBtn from './HomeButton.png'


function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function App() {
    console.log("main app invoked")
    const [postDataOnBasicSearch, setPostDataBasicSearch] = useState({ Name: '' })
    const rangeVal = 10;

    function handleRangerAction(){

        const displayRangeValue = document.getElementById("rangeValueID")
        console.log(displayRangeValue)
        const inputRange = document.getElementById("slider");
        console.log(inputRange)
        
        inputRange.addEventListener('input', ()=> {
            let value = inputRange.value
            rangeVal = value;
            displayRangeValue.textContent = value;
    
        }, false)
    }
    
    


    
    const dispatch = useDispatch()
    const query = useQuery()
    const page = query.get('page') || 1
    console.log("page")
    console.log(page)
    const history = useNavigate()
    
    
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'
    
    const location = useLocation()
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    
    
    console.log(user)
    console.log("2nd time the main app is invoked")
    
    
    
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
    chbxActivities.push({ '$exists': true })
    ZIPFilterArray.push({ '$exists': true })
    CityArray.push({ '$exists': true })
    IntensityArray.push({ '$exists': true })
    audienceArray.push({ '$exists': true })
    priceMinMaxArray.push({ '$exists': true })
    console.log("thisrd time the app is invoked")

    dispatch(getLocationsAdvancedSearch(postDataOnAdvancedSearch, page))

    console.log("4th time the app is invoked")

    function handleSubmitBasicearch(event) {

        event.preventDefault()//prevent page reloading

        dispatch(getLocationsBasicSearch(postDataOnBasicSearch))//dispatches the action
    }

    function handleSubmitAdvancedSearch(event) {
        event.preventDefault()


        chbxActivities = []
        ZIPFilterArray = []
        CityArray = []
        IntensityArray = []
        audienceArray = []
        priceMinMaxArray = []
        postDataOnAdvancedSearch = {
            Checkbox: chbxActivities,
            Zip: ZIPFilterArray,
            City: CityArray,
            Activity: IntensityArray,
            Audience: audienceArray,
            PriceRange: priceMinMaxArray

        }

        //console.log(postDataOnAdvancedSearch)
        //postDataOnAdvancedSearch.Checkbox = []
        let counter = 0;
        activities.forEach((activity) => {
            //console.log(activity)
            if (document.getElementById(activity).checked) {
                chbxActivities.push(document.getElementById(activity).value)
                counter++
            }
        })

        if (counter == 0) { chbxActivities.push({ $exists: true }) }

        //console.log(postDataOnAdvancedSearch.Checkbox)

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
        console.log("INTENSITY ARRAY")
        console.log(IntensityArray)

        if (document.getElementById("pricemin").value) {
            priceMinMaxArray.push(document.getElementById("pricemin").value)
        }
        if (document.getElementById("pricemax").value) {
            priceMinMaxArray.push(document.getElementById("pricemax").value)
        }

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

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history('/')
        setUser(null)
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
                                    <input class='main-searchbar' value={postDataOnBasicSearch.Name} onChange={(e) => setPostDataBasicSearch({ ...postDataOnBasicSearch, Name: e.target.value })} name="main-search-title" type='text' placeholder='Search Specific Destination' id='main-search-title'></input>
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
                        <div class="contact-left">
                            <h5>Contact Us</h5>
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
        </div>
    )
}

export default App;
