/**
 * THIS FILE SERVES AS THE BASE OF THE APPLICATION
 * It only contains the routing for the different pages that are to be loaded
 */
import React, { useEffect } from 'react'
import { BrowserRouter, Routes,  Route } from 'react-router-dom'//allows for the routes to be setup
import { useDispatch } from 'react-redux' 
import { getLocationsBasicSearch } from './actions/actions'

/**
 * The following imports delcare the necessary pages to be routuer to in the application
 * This is the base of the application
 * It only contains a React Commponent that redirects the user to certain web pages
 */
import Login from './pages/Authentication/login'
import MyAccount from "./pages/myAccount"
import Register from './pages/Authentication/Register'
import LandingPage from "./pages/landingpage"
import Location from "./pages/IndividualLocation/location"
import FAQs from "./pages/FAQ"


const App = () => {
    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getLocationsBasicSearch);
    }, [dispatch]) 

    return <div>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />
                <Route path="/id/:id" element={<Location />} />


                <Route path="/login"  element={<Login />} />
                <Route path="/register"  element={<Register />}/>
                

                <Route path="/myAccount"  element={<MyAccount />} />
                <Route path="/faqs"  element={<FAQs />} />

            </Routes>
        </BrowserRouter>
    </div>
}

export default App