/**
 * This file serves as the container for the tilesof each location
 * It is considered a middleman
 * It paginated the data properly to display only 3 tiles at a time for the application's main page
 * 
 * The first import is the react component that is the individual tile -> once the JSON data is found of one location, 
 * ---------> that component is invoked with the details passed to it as props
 */
import LocationCard from './LocationCard'
import './LocationCard.css'

import Pagination from "./Pagination.js"
/**
 * UseSelector is used to pull the data from the global state management library
 * We are in essence pulling the posts that are put onto the client side
 */
import { useSelector, useDispatch } from 'react-redux'
import { storage } from '../../Firebase/firebase-config'
import { ref, getDownloadURL } from "firebase/storage"
import { deleteLocationsFromSaved } from "../../Redux/actions"
import {store} from "../../index.js"

/**
 * UX of the circular progress bar
 */
import {  CircularProgress } from '@material-ui/core'
/**
 * Creating this file as a react functional component by importing React
 */
import React, { useState, useEffect } from 'react'

function App( { isSaved } ) {
    const dispatch = useDispatch()
    
    const [image, setImage] = useState('')
    /**
     * This is the nexus point where we are pulling the data of the returned locations from the state management system
     * Here is a flow of sequence
     * 
     * ---> User inputs advanced search data or name and hits search 
     * ---> Sent to database
     * ---> Database returns - in JSON format - the locations that match the query
     * ---> JSON Data is piped into the Global State Varibale Manager
     * ---> This file pulls the locations that are in the global state manager
     * ---> This file then calls the LocationCard component individually and pipes indiviaul data to that component to create the individual tiles
     * 
     * 
     */
    
    
     let locationsFromStore = useSelector((state) => state.Locations)//this is the access point to the global state of variables that exists within each session f the application
     console.log("locationsFromStore")
     console.log(locationsFromStore)
     const [locations, setLocations] = useState(locationsFromStore)
     useEffect(() => {
         setLocations(locationsFromStore)
     }, [locationsFromStore])
    
    //loading state would be here
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);

    localStorage.setItem('locations', JSON.stringify(locations))
    
    //get current locations
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentLocations = locationsFromStore.slice(indexOfFirstPost, indexOfLastPost);
    console.log("currentLocations");
    console.log(currentLocations);
    const deleteSavedLocation = (id) => {
       
        dispatch(deleteLocationsFromSaved(id))
    }

    //changes pages
    
    const paginate = pageNumber => setCurrentPage(pageNumber);
    getDownloadURL(ref(storage, `Images/No-Results.png`))
        .then((url) => {
            
            setImage(url)
        })
    
    
    if(currentLocations.length && currentLocations[0] === "NO RESULTS"){

        return <div class="no-results-container">
            <img class = "no-results-image" src={image} />
            <br></br>
            <label class="no-results">No results were found for that search</label>
        </div>
    } else if (currentLocations.length && currentLocations[0] === "NO RESULTS - ADVANCED"){
        return <div class="no-results-container">
            <img class = "no-results-image" src={image} />
            <br></br>
            <label class="no-results">No Results Were Found For That Search</label><br></br>
            <label class="no-results">Try Refining Your Search Filters</label>

        </div>
    }
    
    return !(currentLocations.length) ? <CircularProgress className="progress" /> : (
        <div>
            {
                currentLocations.map((oneLocation, i) => {
                    return <LocationCard key = {i} location={oneLocation} isSaved={isSaved} deleteLocation={deleteSavedLocation}/>
                })
            }
            <div class="pagination-bar">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={locations.length}
                    paginate={paginate}
                />
            </div>
        </div>
    )
    
    
}

export default App;