import React from 'react'
import "./DayCard.css"
export default function DayCard({ dateAndLocations }) {
    const readableDate = new Date(Date.parse(dateAndLocations.Date))
  return (
    <div class="day-trip-container">
      {
        readableDate.toDateString()
      }
     
    </div>
  )
}
