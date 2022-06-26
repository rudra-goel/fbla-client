import React, { useState, useEffect } from 'react'
import "./TripPreview.css"

export default function TripPreview({ trip }) {

    /**
     * Upcoming
     * Past
     * 
     */
    const [during, setDuring] = useState(false)

    const todaysDate = new Date()
    const startDate = new Date (Date.parse(trip.startDate))
    const endDate = new Date(Date.parse(trip.EndDate))
    useEffect(() => {
    
        if (todaysDate > startDate && todaysDate < endDate) {
            setDuring(true)
        }
    }, [])

  return (
    <div class="trip-preview-container">
        <a href={`trip/${trip.Name}/`}>
            <div class="trip-information-container">
                <div class="trip-name-container">
                    <h2 class="trip-name">{trip.Name}</h2>      
                </div>

                <div class="trip-dates">
                    <label class="start-date"><b>Trip Starts: </b> {startDate.toDateString()}</label> <br></br>
                    <label class="end-date"><b>Trip Ends: </b>{endDate.toDateString()}</label>
                </div>

                <div class="active-inactive">
                    {
                        during ? (
                            <label class="active">Active Trip</label>
                            ) : (
                                <label class="inactive">Inactive Trip</label>
                                )
                    }
                </div>
            </div>

        </a>
    </div>
  )
}