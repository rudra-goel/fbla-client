/**
 * THis file serves as the page for the account information (or the saved locations) of the user
 * It displays all of the saved locations of the user
 * 
 * The first file serves aas the styling of the page
 */
 import './SavedLocations.css'
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
 
 /**
  * @returns HTML Component of the MyAccount page
  */
 function App({ user }) {
     
 
    
     const likedIds = user.likedLocations
      
     return (
         <div class="savedLocations-container">
 
            <h1 class="saved-title">
                My Saved Locations
            </h1>
             <div class="likedLocations">
                 {likedIds?.length != 0 ? <LocationCardContainer isSaved={true} /> : <div> <br></br><h1>You don't have any liked locations</h1></div>}
             </div>
         </div>
     );
 }
 
 export default App