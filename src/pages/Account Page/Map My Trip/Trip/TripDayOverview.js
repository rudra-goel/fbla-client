import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { CircularProgress } from "@material-ui/core"
import { getFavoriteLocations } from "../../../../Firebase/firestore-query"

import LocationCard from "../../../LocationCard/LocationCard"
import Map from "./Map"
import "./TripDayOverview.css"
export default function TripDayOverview() {
  const { date } = useParams()


  const myTrip = JSON.parse(localStorage.getItem("Current Trip"))
  
  const [myDate, setMyDate] = useState()
  const [locations, setLocations] = useState(false)
  const [hasLocations, setHasLocations] = useState(true)
  let dateRead = new Date(Date.parse(date))

  useEffect(() =>{
    myTrip.LocationsOnTrip.map((day) => {
      if (day.Date === date) {
        
        setMyDate(day)
      }
    })    
    
    
  }, [])

  useEffect(() =>{
    if (myDate?.LocationsForToday){
      const locationIds = myDate.LocationsForToday
      getFavoriteLocations(locationIds)
        .then((locations) => {
          if (locations.length > 0){
            setLocations(locations)
          } else {
            setHasLocations(false)
          }
        })
    }
  }, [myDate])
  

  
  return (
    <div class="trip-by-day-container">

        <div class="name-and-dates">
          <div class="trip-name">
            <label class="trip-name-label">{myTrip.Name}</label>
          </div>
          <div class="trip-dates">
            <label class="trip-dates-label">{dateRead.toDateString()}</label>
          </div>
        </div> 
        <div class="hero-map-and-location">

          <div class="left-side-location-cards">
            {
              hasLocations ? (
                <div>
                  {
                    !locations ? (
                      <CircularProgress />
                      ) : (
                      locations.map((location) => {
                        return <LocationCard location={location} enabled={false} />
                      })
                    )
                  }
                </div>
              ) : (
                <h2>You have no locations scheduled for today!</h2>
              )
            }
          </div>
          <div class="right-side-google-map">
            <Map />
          </div>
        </div>
    </div>
  )
}
