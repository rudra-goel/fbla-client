import React, { useEffect } from 'react'
import { BrowserRouter, Routes,  Route, Redirect } from 'react-router-dom'//allows for the routes to be setup
import { useDispatch } from 'react-redux' 
import { getLocationsBasicSearch } from './actions/actions'

/*
the following imports specify the static pages on the client side
*/

//react pages must be capital!!
import Login from './pages/Authentication/login'
import MyAccount from "./pages/myAccount"
import Register from './pages/Authentication/Register'
import Favorites from "./pages/favorites"
import LandingPage from "./pages/landingpage"
import Location from "./pages/IndividualLocation/location"
import FAQs from "./pages/FAQ"


const App = () => {
    
    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(getLocationsBasicSearch);
    }, [dispatch]) 

    const user = JSON.parse(localStorage.getItem('profile'))
    console.log(user)

    return <div>
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<LandingPage />} />
                <Route path="/id/:id" element={<Location />} />


                <Route path="/login"  element={<Login />} />
                <Route path="/register"  element={<Register />}/>
                

                <Route path="/myAccount"  element={<MyAccount />} />
                <Route path="/favorites"  element={<Favorites />} />
                <Route path="/faqs"  element={<FAQs />} />

            </Routes>
        </BrowserRouter>
    </div>
}

export default App