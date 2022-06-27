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
 import { MdDelete } from "react-icons/md"
 import { storage } from '../../Firebase/firebase-config'

 import './LocationCard.css'
 
 
 function App({ location, enabled, isSaved, deleteLocation }) {
     const [image, setImage] = useState('')
     


     getDownloadURL(ref(storage, `Images/${location.Categories}.jpg`))
                        .then((url) => {
                            
                            setImage(url)
                        })
     /**
      * The HTML of the component is then declared as followed and returned to be displayed on the maing application
      */
     const deleteLocationFunc = () => {

        deleteLocation(location.itemID)
     }
     

     /* This creates the location cards seen in the map my trip overview page */
     if (enabled === false ){
        return (
            <div>
             <div class="list-locations-for-trip">
                     <div class="list-locations-trip-item">
                         <img class="activity-img-for-trip" id="location-image" src={image} alt="Loading Image" ></img>
                         <div class = "middle-item-details-trip">
                             <label class='list-name'>{location.Name}</label>
                             <label class='list-phone'>{location.Phone}</label>
                             <label class='list-location'>{location.City}, {location.Sate} - {location.Zip}</label>
                             <label class='list-categories'>Activity Type: {location.Categories}</label>
                             <label class='list-categories'>{location.BusinessURL}</label>
                         </div>
                     </div>                       
             </div>        
            </div>
         )
     }

     /* This creates the location cards seen in the home page and saved locations page */
     return (
        <div>
         <div class="list-locations">
             <a href={`/id/${location.itemID}`}>
                 <div class="list-locations-item">
                     <img class="activity-img" id="location-image" src={image} alt="Loading Image" ></img>
                     <div class = "middle-item-details">
                         <label class='list-location-name'>{location.Name}</label>
                         <label class='list-location-phone'>{location.Phone}</label>
                         <label class='list-location-location'>{location.City}, {location.Sate} - {location.Zip}</label>
                         <label class='list-location-categories'>Activity Type: {location.Categories}</label>
                         <label class='list-location-categories'>{location.BusinessURL}</label>
                     </div>
                     
                 </div>
             </a>                       
            <div class="delete-btn">
                {
                isSaved ? (
                    <div onClick={deleteLocationFunc}>
                        <MdDelete size={40} />
                    </div>
                ) : <></>
                }
            </div>
         </div>        
        </div>
     )
 }
 
 export default App;