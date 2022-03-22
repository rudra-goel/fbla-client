import LocationCard from './LocationCard'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import {  CircularProgress, Grid } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function App() {
    const locations = useSelector((state) => state.posts)//this is the access point to the global state of variables that exists within each session f the application
    console.log("locations")
    console.log(locations)
    localStorage.setItem("locations",JSON.stringify(locations))
  

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
    return (//as for now, the h1 tags are there to be replaced by the "hawt attractions" card in the future
    //for now the header tags serve as proof of concept tat this will work
        <CircularProgress className = "circular-progress" />
    )
}

export default App;