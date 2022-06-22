import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import LocationCard from "../../../../LocationCard/LocationCard"
import { getFavoriteLocations } from "../../../../../Firebase/firestore-query"
import "./LocationsByDay.css"
import DayCard from './DayCard'





export default function LocationsByDay() {

  const [locationsUnsorted, setLocationsUnsorted] = useState([])
  const listOfTrips = JSON.parse(localStorage.getItem('Trips'))
  let { tripName } = useParams()
  let myTrip = {}
  listOfTrips.map((trip) => {
    if(trip.Name === tripName) {
      myTrip = trip;
    }
  })
  
  return (
    <div>
      
      LocationsByDay!
       
        <h2>Plan By Day</h2>
        <div class="days-on-trip-container">
          {
            myTrip.LocationsOnTrip.map((item) => {
              return (
                <DayCard dateAndLocations={item} />
                )
              })
            }
        </div>
      
      
    </div>
  )
}
