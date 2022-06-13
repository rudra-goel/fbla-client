/**
 * THis file serves as the page for the account information (or the saved locations) of the user
 * It displays all of the saved locations of the user
 * 
 * The first file serves aas the styling of the page
 */
import './myAccount.css'
/**
 * useState is used to store the variables of the component into a management library
 */
import { useState } from 'react'
/**
 * React hooks that allow for redirects behind the scene for the user
 * It allows the programmer to forcefully redirect the user to other pages of the website
 */
import { useNavigate, useLocation } from 'react-router-dom'
/**
 * This import creates the function declared to be a React Functional Component
 */
import React, { useEffect } from 'react'
/**
 * Dispatch is used to manage the variables accross the entire project
 * In order to load a varible to the global state, we use Dispatch from Redux
 */
import { useDispatch } from 'react-redux'
/**
 * This is a component that returns a list of each location tile
 */
import LocationCardContainer from '../LocationCard/LocationCardContainer'
/**
 * This is a middleman function that attempts to get all of the JSON data of the liked locations by ID
 */
import { getLocationsByFavorites } from '../../Redux/actions.js'


import { BrowserRouter, Routes,  Route, Outlet } from 'react-router-dom'//allows for the routes to be setup
import SubNavbar from "./SubNavbar"

/**
 * @returns HTML Component of the MyAccount page
 */
function App() {
    /**
     * Initialization of the dispatch function
     */
    const dispatch = useDispatch()
    /**
     * Initialization of the useNavigate Hook
     */
    const history = useNavigate()
    /**
     * We are pulling the user's data from the local storage of the client by the localstorage.getItem call
     * We are then setting a user variable to that data using the useSatte hook provided by React
     */
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'
    /**
     * Initialization of the useLocationn Hook
     */
    const location = useLocation()

    /**
     * Everytime the window object experiences a change, this useEffect hook will be invoked -> hence the dependency array
     * We are then setting the updated user with the updated information we are pulling from the local storage
     */
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])
    /**
     * Logout function that is invoked when the user pushes logout
     * It clears the global state of the user and sets the local user to null
     */
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        history('/')
        setUser(null)
    }

    /**
     * Within the user's details, there is a field for the liked locations
     * We are creating a variable which is an array
     * This array holds all of the IDs of the liked locations of the user
     */
    const likedIds = user.likedLocations
    /**
     * The liked locations declared above is then passed to the middleman function that returns an array of JSON objects of the liked locations
     * This list is then dispatched into the gloabl state of variables so that the location tiles can access it for later
     */
    
     dispatch(getLocationsByFavorites(likedIds))

    return (
        <div>
            <div class="navbar">
                <div class="container">
                    <nav>
                        <a class="logo">View<span>Rado</span></a>
                        <div class="top-left">
                            <a class="return-home" href="/" >Home</a>
                            <a class = "faq" href = "/faqs" >FAQs</a>
                        </div>
                        
                        <div class="myAcc">
                            {user?.uuid ? (
                                <a class="myacc" href='/myAccount'>Account Page</a>
                            ) : (
                                <div></div>
                            )}
                        </div>

                        <div class="top-right">

                            {user?.uuid ? (
                                <div class="if-logged-in-navbar">
                                    <label>Hello {user.Name}!</label>
                                    <button value="logout" onClick={logout}>Logout</button>
                                </div>

                            ) : (
                                <div></div>
                            )}

                        </div>

                    </nav>
                </div>
            </div>
            <div class="subNav">
                <SubNavbar />
            </div>
            <Outlet />
            
        </div>
    );
}

export default App