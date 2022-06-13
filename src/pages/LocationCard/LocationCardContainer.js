/**
 * This file serves as the container for the tilesof each location
 * It is considered a middleman
 * It paginated the data properly to display only 3 tiles at a time for the application's main page
 * 
 * The first import is the react component that is the individual tile -> once the JSON data is found of one location, 
 * ---------> that component is invoked with the details passed to it as props
 */
import LocationCard from './LocationCard'

import Pagination from "./Pagination.js"
/**
 * UseSelector is used to pull the data from the global state management library
 * We are in essence pulling the posts that are put onto the client side
 */
import { useSelector } from 'react-redux'

/**
 * UX of the circular progress bar
 */
import {  CircularProgress } from '@material-ui/core'
/**
 * Creating this file as a react functional component by importing React
 */
import React, { useState, useEffect } from 'react'

function App() {
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
    const locationsFromStore = useSelector((state) => state.Locations)//this is the access point to the global state of variables that exists within each session f the application
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
    

    //changes pages
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
    return !(currentLocations.length) ? <CircularProgress className="progress" /> : (
        <div>
            <div class="pagination-bar">
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={locations.length}
                    paginate={paginate}
                />
            </div>
            {
                currentLocations.map((oneLocation, i) => {
                    return <LocationCard key = {i} location={oneLocation} />
                })
            }
        </div>
    )
    
    
}

export default App;