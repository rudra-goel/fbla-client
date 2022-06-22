import React from 'react'
import { useParams } from "react-router-dom"
import backButton from "../../../Images/backButton.png"
import TripSubnav from "./TripSubnav"
import { Outlet } from 'react-router-dom'
import "./Trip.css"
export default function Trip() {
    const listOfTrips = JSON.parse(localStorage.getItem('Trips'))
    let { tripName } = useParams()
    
    let myTrip = {}
    listOfTrips.map((trip) => {
      if(trip.Name === tripName) {
        myTrip = trip;
      }
    })
    
  return (
    <div class="individual-trip-container">
      <a href="/myAccount/mapMyTrip">
        <img src={backButton} class="back-button"/>
      </a>
      <div class="trip-name">
        {myTrip.Name}
      </div>
      <div class="trip-dates">
        Dates: 
        {myTrip.startDate}-------
        {myTrip.EndDate}
      </div>
      <TripSubnav />
      <Outlet />
    </div>
  )
}
