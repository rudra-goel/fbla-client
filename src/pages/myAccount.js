//import React, { useEffect } from 'react'
import './myAccount.css'
import { useState, setState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import LocationCardContainer from './LocationCard/LocationCardContainer'
import { getLikedLocations } from '../actions/actions'
function App() {
    const dispatch = useDispatch()
    const history = useNavigate()

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'

    const location = useLocation()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history('/')
        setUser(null)
    }


    const likedIds = user.result.likedLocations

    console.log("inside my account and these are the liked ids")
    console.log(likedIds)

    dispatch(getLikedLocations(likedIds))
    return (
        <body>

            <div class="navbar">
                <div class="container">
                    <nav>
                        <a class="logo">View<span>Rado</span></a>
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
                                    <button value="logout" onClick={logout}>Logout</button>
                                </div>

                            ) : (
                                <div></div>
                            )}

                        </div>

                    </nav>
                </div>
            </div>

            <div class='hero'>
                <label class="savedlocations">Your Saved Locations</label>
            </div>
            <div class="likedLocations">
                {likedIds?.length != 0 ? <LocationCardContainer /> : <div> <br></br><h1>You don't have any liked locations</h1></div>}
            </div>
        </body>
    );
}

export default App