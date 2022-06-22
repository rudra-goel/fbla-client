import React from 'react'
import "./TripSubnav.css"
import { Link } from 'react-router-dom'

export default function TripSubnav() {
  return (
    <div class="trip-link-container">
      <Link to="locationsByDay" >
        <a  class="trip-subnav-button">Locations By Day</a>
      </Link>
      <Link to="maps" >
        <a class="trip-subnav-button">Maps</a>
      </Link>
      <Link to="calendar" >
        <a class="trip-subnav-button">Calendar</a>
      </Link>
      

    </div>
  )
}
