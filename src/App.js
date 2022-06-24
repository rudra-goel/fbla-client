/**
 * THIS FILE SERVES AS THE BASE OF THE APPLICATION
 * It only contains the routing for the different pages that are to be loaded
 */
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes,  Route } from 'react-router-dom'//allows for the routes to be setup
import { useDispatch } from 'react-redux' 
import { getLocationsBasicSearch } from './Redux/actions'

/**
 * The following imports delcare the necessary pages to be routuer to in the application
 * This is the base of the application
 * It only contains a React Commponent that redirects the user to certain web pages
 */
import Login from './pages/Authentication/login'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import MyAccount from "./pages/Account Page/MyAccount"
import SavedLocations from "./pages/Account Page/SavedLocations"
import Profile from "./pages/Account Page/Profile"
import MapMyTrip from "./pages/Account Page/Map My Trip/MapMyTrip"
import Trip from "./pages/Account Page/Map My Trip/Trip/Trip"
import TripDayOverview from "./pages/Account Page/Map My Trip/Trip/TripDayOverview"
import MyReviews from "./pages/Account Page/MyReviews"
import Register from './pages/Authentication/Register'
import LandingPage from "./pages/landingpage"
import Location from "./pages/IndividualLocation/location"
import FAQs from "./pages/FAQ"


const App = () => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'

    

    return (<>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />
                <Route path="/id/:id" element={<Location />} />


                <Route path="/login"  element={<Login />} />
                <Route path="/resetPassword"  element={<ForgotPassword />} />
                <Route path="/register"  element={<Register />}/>
                

                <Route path="myAccount"  element={<MyAccount />} >
                    <Route path="mapMyTrip" element={<MapMyTrip />} />
                    <Route path="savedLocations" element={<SavedLocations user={user}/>} />
                    <Route path="profile" element={<Profile user={user} />} />
                    <Route path="reviewHistory" element={<MyReviews user={user} />} />
                    <Route path="trip/:tripName" element={<Trip />} />
                    <Route path="trip/:trip/date/:date" element={<TripDayOverview />} />
                </Route>
                <Route path="/faqs"  element={<FAQs />} />

            </Routes>
        </BrowserRouter>
        
    </>)
}

export default App