import React, { useState, useEffect } from 'react'
import { getMyTrips } from "../../../Firebase/firestore-query.js"
import { CircularProgress } from "@material-ui/core"
import TripPreview from "./TripPreview.js"
import CreateNewTrip from './CreateNewTrip'
import "./MapMyTrip.css"
export default function MapMyTrip() {

  const [isOpen, setIsOpen] = useState(false)
  const [myTrips, setMyTrips] = useState([])
  const [hasTrips, setHasTrips] = useState(true)
  const user = JSON.parse(localStorage.getItem('profile'))
  localStorage.setItem('Trips', JSON.stringify(myTrips))

  const closeModal = () => {
    getMyTrips(user.uuid)
      .then((trips) => {
        setMyTrips(trips)
        if(myTrips.length === 0){
          setHasTrips(false)
        }
      })
    setIsOpen(false)
  }

  useEffect(() => {
    getMyTrips(user.uuid)
      .then((trips) => {
        setMyTrips(trips)
        if(myTrips.length === 0){
          setHasTrips(false)
        }
      })

  }, [])
  
  console.log("My Trips")
  console.log(myTrips)

  if (myTrips.length && myTrips[0] === "NO RESULTS"){
    return (
      <div class="map-my-trip-container">
        <div class="create-new-trip-button" onClick={() => setIsOpen(true)}>
          <button>Create a New Trip</button>
        </div>
        <CreateNewTrip open={isOpen} close = {closeModal}/>
        <div>
            <label class="no-results">You have no trips!</label>
        </div>
        </div>
    )
  }
  return (
    <div class="map-my-trip-container">
      <div class="create-new-trip-button" onClick={() => setIsOpen(true)}>
        <button>Create a New Trip</button>
      </div>
      <CreateNewTrip open={isOpen} close = {closeModal}/>
      
        {
          myTrips.length===0 ? (
            
            <CircularProgress />
          ) : (
            <div class="my-trips"> 
              {
                myTrips.map((trip) => {
                  return (
                    <TripPreview trip={trip} />
                  )
                })
              }
            </div>
          )
        }
      </div>
  )
}
