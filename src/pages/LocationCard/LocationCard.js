/**
 * This file serves as the individual card for each location that is displayed on the landing page.
 * It takes in the details fo the location through props and it puts it into a readable format via HTML5
 */

/**
 * The React import statement is used for creating the component and allowing it to be added to the overall application
 * The second import statement is used to style the card itself
 */
import React from 'react'
import './LocationCard.css'


function App({ location }) {
    /**
     * Formatting the Base64 String og the image properly so that the HTML <img> tage and properly read it
     * 
     * We pull part of the base64 url which comes from the database, and we append strings to the front
     */
    const imgURL = `data:image/jpeg;base64,${location.Base64String}`
    
    /**
     * The HTML of the component is then declared as followed and returned to be displayed on the maing application
     */
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