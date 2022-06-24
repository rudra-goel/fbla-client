import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import DayCard from "./DayCard"
import {CircularProgress} from "@material-ui/core"
import OverviewCalendar from "./OverviewCalendar"
import "./Trip.css"


export default function Trip() {
  const [myTrip, setMyTrip] = useState({})
  const { tripName } = useParams()
  useEffect(() =>{
    const listOfTrips = JSON.parse(localStorage.getItem('Trips'))
    listOfTrips.map((trip) => {
      if(trip.Name === tripName) {
        setMyTrip(trip)
      }
    })
  }, [])
  
  localStorage.setItem("Current Trip", JSON.stringify(myTrip))
  const start = new Date(Date.parse(myTrip.startDate))
  const end = new Date(Date.parse(myTrip.EndDate))


  return (
    <div class="trip-info-container">
      <div class="name-and-dates">
        <div class="trip-name">
          <label class="trip-name-label">{myTrip.Name}</label>
        </div>
        <div class="trip-dates">
          <label class="trip-dates-label">Dates: {start.toDateString()} --- {end.toDateString()}</label>
        </div>
      </div>  
      <div class="trip-hero">
        <div class="day-card-container">
          {
            myTrip?.LocationsOnTrip ? (
              <div>
                {myTrip.LocationsOnTrip.map((day, index) => {
                  return (
                    <DayCard key={index} day={day}/>
                  )
                })}
              </div>
            ) : (
              <CircularProgress />
            )
          }
        </div>
        <div class="calendar-container">
        {
            myTrip?.LocationsOnTrip ? (
              <div>
                <OverviewCalendar days={myTrip} />
              </div>
            ) : (
              <h2>Locading Calendar...</h2>
            )
          }
        </div>
      </div>    
    </div>
  )
}
