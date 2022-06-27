import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import { useParams } from "react-router-dom"
import { getMyTrips, updateATrip } from '../../Firebase/firestore-query'
import "./AddToTrip.css"

export default function AddToTrip({ open, close }) {

  const [myTrips, setMyTrips] = useState([])
  const [selectedTrip, setSelectedTrip] = useState()
  const [added, setAdded] = useState(false)
  const { id } = useParams()
  console.log(id)
  
  useEffect(() => {
    if (user?.uuid){

      getMyTrips(user.uuid)
        .then((trips) => {
          setMyTrips(trips)
          setSelectedTrip(myTrips[0])
        })
    }
  }, [])
  const user = JSON.parse(localStorage.getItem('profile'))

  const handleAddToTrip = () => {
    /**
     * This method should call the firestore query method and only pass the updated trip information for it to update in DBMs
     *
     */
    let tripToUpdate = selectedTrip
    const dayToAdd = document.getElementById("trip-date-select").value
    tripToUpdate.LocationsOnTrip.map((days) => {
      if(days.Date === dayToAdd) {
        days.LocationsForToday.push(id)
        console.log(days.LocationsForToday)
      }
    })
    /**
     * Need to call firestory query function to update the document
     */
    updateATrip(tripToUpdate)
      .then((message) => {
        if (message === "Success"){
          close()
        }
      })
  }

  const handleNameSelect = () => {
    const tripName = document.getElementById("trip-name-select").value
    myTrips.map((trip) => {
      if (trip.Name === tripName){
        setSelectedTrip(trip)
      }
    })  

  }

  if (!open) return null





  return ReactDom.createPortal(
    <>
        <div class="overlay" />
        <div class="add-new-location-to-trip">
            <select class="trip-select" id="trip-name-select" onChange={handleNameSelect}>
              <option>Select a Trip</option>
              {
                myTrips.map((trip) => {
                  return (
                    <option value={trip.Name}>{trip.Name}</option>
                  )
                })
              }
            </select>
            <select id="trip-date-select" class="trip-select">
              
              {
                selectedTrip?.LocationsOnTrip.map((day) => {
                  const date = new Date(Date.parse(day.Date))
                  return (
                    <option value={day.Date}>{date.toDateString()}</option>
                  )
                })
              }
            </select>

            <button onClick={handleAddToTrip}>Add to Trip</button>
            <button onClick={close}>Exit</button>
            <br></br>
            {
              added ? <label>Location Successfully added</label> : <div></div>
            }
        </div>

    </>, document.getElementById("modal-add-trip")
  )
}
