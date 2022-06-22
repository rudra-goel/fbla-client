import React, { useState } from 'react'
import ReactDom from 'react-dom'
import { createNewTrip } from "../../../Firebase/firestore-query.js"
import "./CreateNewTrip.css"



export default function CreateNewTrip({ open, close }) {

    const [name, setName] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [totalPeople, setTotalPeople] = useState("")
    const user = JSON.parse(localStorage.getItem('profile'))
    const makeNewTrip = () => {
        createNewTrip(name, start, end, totalPeople, user.uuid)
            .then(() => {
                close();
            })
            .catch((error) => {
                window.alert(error)
            })
    }

    if (!open) return null
    
  return ReactDom.createPortal(
    <>
        <div class="overlay" />

        <div class="create-new-trip-container">
            <div>
                <label>Trip Name: </label><br></br>
                <input type="text" name="trip-name"  value={ name } onChange={(e) => setName(e.target.value)}></input>
            </div>
            
            <div>
                <label>Start Date: </label><br></br>
                <input type="date" name="trip-date-start" value={ start } onChange={(e) => setStart(e.target.value)}></input>
            </div>
            
            <div>
                <label>End Date: </label><br></br>
                <input type="date" name="trip-date-end" value={ end } onChange={(e) => setEnd(e.target.value)}></input>
            </div>

            <div>
                <label>Total People: </label><br></br>
                <input type="number" name="trip-people-number" value={ totalPeople } onChange={(e) => setTotalPeople(e.target.value)} ></input>
            </div>
            <button type="submit" onClick={makeNewTrip}>Create</button>
            <button onClick={close}>Exit</button>
            
        </div>
    </>,
    document.getElementById('modal')
  )
}
