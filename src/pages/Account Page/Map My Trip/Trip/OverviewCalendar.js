import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import "react-big-calendar/lib/css/react-big-calendar.css" 
import { getFavoriteLocations } from "../../../../Firebase/firestore-query"

import "./OverviewCalendar.css"
import { useEffect } from 'react'



const locales = {
  "en-US": require("date-fns/locale/en-US")

}

const localizer = dateFnsLocalizer({
  format, 
  parse, 
  startOfWeek,
  getDay, 
  locales
})

export default function OverviewCalendar({ days }) {
  const [myEvents, setEvents] = useState()
  useEffect(() => {
    let tempEvents = []
    days.LocationsOnTrip.map(async (day)=> {
      const locations = await getFavoriteLocations(day.LocationsForToday)
      locations.map((location) => {
            let startDate = day.Date.split("-")
            
            const objToAdd = {
              title: location.Name,
              start: new Date(startDate[0], startDate[1]-1, startDate[2]),
              end: new Date(startDate[0], startDate[1]-1, startDate[2])
            }
            tempEvents.push(objToAdd);
          })
        })
    console.log("Temp Events")
    console.log(tempEvents)

    setEvents(tempEvents)
    

    

  }, [])

  console.log("events")
  console.log(myEvents)
  return (
    <>
      <Calendar events={myEvents} localizer={localizer}  startAccessor="start" endAccessor="end" className="calendar"/>
    </>
  )
}
