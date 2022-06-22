/**
 * This file serves as the individual card for each location that is displayed on the landing page.
 * It takes in the details fo the location through props and it puts it into a readable format via HTML5
 */

/**
 * The React import statement is used for creating the component and allowing it to be added to the overall application
 * The second import statement is used to style the card itself
 */
 import React, { useState } from 'react'
 import { ref, getDownloadURL } from "firebase/storage"
 import { storage } from '../../Firebase/firebase-config'

 import './LocationCard.css'
 
 
 function App({ location, enabled }) {
     const [image, setImage] = useState('')
     


     getDownloadURL(ref(storage, `Images/${location.Categories}.jpg`))
                        .then((url) => {
                            
                            setImage(url)
                        })
     /**
      * The HTML of the component is then declared as followed and returned to be displayed on the maing application
      */

     if (enabled === false ){
        return (
            <div>
             <div class="list-locations-for-trip">
                     <div class="item">
                         <img class="activity-img-for-trip" id="location-image" src={image} alt="Loading Image" ></img>
                         <div class = "middle-item">
                             <label class='name'>{location.Name}</label>
                             <label class='phone'>{location.Phone}</label>
                             <label class='location'>{location.City}, {location.Sate} - {location.Zip}</label>
                             <label class='categories'>Activity Type: {location.Categories}</label>
                             <label class='categories'>{location.BusinessURL}</label>
                         </div>
                     </div>                       
             </div>        
            </div>
         )
     }
     return (
        <div>
         <div class="list-locations">
             <a href={`/id/${location.itemID}`}>
                 <div class="item">
                     <img class="activity-img" id="location-image" src={image} alt="Loading Image" ></img>
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