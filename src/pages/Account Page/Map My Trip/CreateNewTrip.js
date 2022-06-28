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
        <div class="big-container">
            <div class="create-new-trip-container">
                <div>
                    <label><b>Trip Name: </b></label><br></br>
                    <input class="create-trip-input" type="text" name="trip-name"  value={ name } onChange={(e) => setName(e.target.value)}></input>
                </div>
                
                <div>
                    <label><b>Start Date: </b></label><br></br>
                    <input class="create-trip-input" type="date" name="trip-date-start" value={ start } onChange={(e) => setStart(e.target.value)}></input>
                </div>
                
                <div>
                    <label><b>End Date: </b></label><br></br>
                    <input class="create-trip-input" type="date" name="trip-date-end" value={ end } onChange={(e) => setEnd(e.target.value)}></input>
                </div>

                <div>
                    <label><b>Total People: </b></label><br></br>
                    <input class="create-trip-input" type="number" name="trip-people-number" value={ totalPeople } onChange={(e) => setTotalPeople(e.target.value)} ></input>
                </div>
                <button type="submit" onClick={makeNewTrip} class="create-button">Create</button>
                <button onClick={close} class="exit-button">Exit</button>
            </div>
        </div>
        
    </>,
    document.getElementById('modal')
  )
}
