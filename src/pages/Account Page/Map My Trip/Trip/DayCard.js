import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { getFavoriteLocations } from "../../../../Firebase/firestore-query"

import "./DayCard.css"
export default function DayCard({ day }) {
  const date = new Date(Date.parse(day.Date))
  const [locations, setLocations] = useState([])
  useEffect(() => {
    getFavoriteLocations(day.LocationsForToday)
      .then((locations) => {
        if (locations.length > 0){

          setLocations(locations)
        } else {
          setLocations(false)
        }
      })
  }, [])

  return (
    <Link to={`date/${day.Date}`} style={{ textDecoration: 'none', color: 'black'}}>
      <div class="day-container">
        <div class="left-section-day">
          <label class="day-label">{date.toDateString().split(' ').slice(1, 3).join(' ')}</label>
        </div>
        <div class="right-section-day">
          <label class="planned-locations-text">Planned Locations</label> <br></br>
            {
              !locations ? <label>You did not add locations for this day</label> : (
                <div class="unordered-list">
                  {
                    locations.map((location, index) => {
                      return (
                        <div key={index}>• {location.Name}</div>
                        )
                      })
                    }
                </div>
              )
            }
        </div>
      </div>
    </Link>
  )
}
