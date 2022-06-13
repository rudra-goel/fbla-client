import React from 'react'
import "./SubNavbar.css"

import { Link } from 'react-router-dom'

export default function SubNavbar() {
  return (
    <div class="link-container">
      <Link to="savedLocations" >
        <a  class="navigate-review-button">Saved Locations</a>
      </Link>
      <Link to="profile" >
        <a class="navigate-review-button">Profile</a>
      </Link>
      <Link to="mapMyTrip" >
        <a class="navigate-review-button">Map My Trip</a>
      </Link>
      <Link to="reviewHistory" >
        <a class="navigate-review-button">Review History</a>
      </Link>

    </div>
  )
}
