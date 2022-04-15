/**
 * This file serves as the container for the tilesof each location
 * It is considered a middleman
 * It paginated the data properly to display only 3 tiles at a time for the application's main page
 * 
 * The first import is the react component that is the individual tile -> once the JSON data is found of one location, 
 * ---------> that component is invoked with the details passed to it as props
 */
import LocationCard from './LocationCard'
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
import React from 'react'

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
    const locations = useSelector((state) => state.posts)//this is the access point to the global state of variables that exists within each session f the application
    
    /**
     * We now set the locations recieved through to local storage on the client's side
     */
    localStorage.setItem("locations",JSON.stringify(locations))

    /**
     * Because fo the different formatting of the data returned, the following if-then-else statements check to see all the possible cases
     * And returns the component as necessary
     */
    if (locations.places?._id){
        return(
            <LocationCard key = {locations.places._id} location = {locations.places} />
        )
    } else if (locations.places?.data?._id){
        return(
            <LocationCard key = {locations.places.data._id} location = {locations.places.data} />
        )
    }
    if (locations?.places){
        return !(locations.places.length) ? <CircularProgress className = "circular-progress" /> : (
            locations.places.map((response) => (
                <LocationCard key = {response.__id} location = {response} />
            ))
        )
    }
    return (
        <CircularProgress className = "circular-progress" />
    )
}

export default App;