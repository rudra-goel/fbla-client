import React from 'react'
import { useDispatch } from 'react-redux'
import { likeLocations, getLocationByID } from "../../actions/actions.js"
import { CardMedia } from '@material-ui//core'

import './LocationCard.css'

function App({ location }) {
    const dispatch = useDispatch()

    //console.log(locations)
    //console.log(location.data.length)
    //console.log("inside individual card")
    //console.log(location)
    const imgURL = `data:image/jpeg;base64,${location.Base64String}`
    const type = "Business URL"
    
    
    return (
        <div>
        <div class="list-locations">
            <a href={`/id/${location._id}`}>
                <div class="item">
                    <img class="activity-img" src ={imgURL}></img>
                    <div class = "middle-item">
                        <label class='name'>{location.Name}</label>
                        <label class='phone'>{location.Phone}</label>
                        <label class='location'>{location.City}, {location.Sate} - {location.Zip}</label>
                        <label class='categories'>Activity Type: {location.Categories}</label>
                        <label class='categories'>{location.BusinessURL}</label>
                    </div>
                </div>

            </a>                       
        </div>
    </div>
    )
}

export default App;