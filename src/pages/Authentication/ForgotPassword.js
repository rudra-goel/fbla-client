/**
 * This file is the React Functional Component for the login page of ViewRado
 * It contains the form input fields and upon submit, it pipelines the data to the backend server to be authenticated
 * 
 * The first Import statment is the styling of the webpage
 */

 import './login.css'

 /**
  * The useState is a react hook that manages the variables wihtin this component -> it is imported through React
  */
 import { useState } from 'react'

 import { forgotPassword } from "../../Firebase/firestore-query"

 /**
  * This is a component preloaded from @material-ui/core that displays a circular progress bar for UX
  */
 import {  CircularProgress, Grid } from '@material-ui/core'
 
 /**
  * This is a prewritten function that is imported to validate the user credentials 
  * This imported function serves as a middleman for the component and the api call to the database
  */
 
 
 /**
  * All React Components follow the same syntax where a function that contains certain business logic is created
  * The return of the function is the HTML that is rendered onto the webpage
  * This function notation allows for the re-render upon variable change
  * @returns HTML Body that is rendered onto the webpage
  */
 function App() {
  
     /**
      * Initialization of the login state vairbales
      * This loginData contains a JSON object containing the attempted Email and the attempted Password
      * Everytime the user inputs data into the field, the loginData is updated to match
      */
     const [email, setEmail] = useState("")
     /**
      * Initialization of the useNavigate Hook
      */
     
     /**
      * This is another React variable that is used for loading
      * When the user clicks the login button, this loading variable is set to true
      * The circular progress bar is then displayed to indicate to the user that loading state is activated
      */
     
     /**
      * The following function is invoked when the user clicks the login button
      * It parses through the form data and dispatches the data by first calling the validate function
      * @param {HTML Object} event 
      */
     async function sendEmail(event) {
         event.preventDefault();
         forgotPassword(email)
            .then(() => {
                window.alert(`Email Sent to ${email}`)
            }).catch((error) => {
                window.alert(error.message);
            })
    }
 
   return (
     <body>
         <div class="navbar">
             <div class="container">
                 <nav>
                     <a class="logo" href="/">View<span>Rado</span></a>
 
                     <div class = "top-left">
                             <a class = "return-home" href = "/">Home</a>
                             <a class = "faq" href = "/faqs" >FAQs</a>
                     </div>
 
                     <div class = "top-right">
                             
                     </div>
                 </nav>
             </div>
         </div>
 
 
         <section class = "hero" >
             <div class="specificformat">
                 <div class = "container">
                     <h1>Reset Password</h1>
                     <div class = "enter-credentials">
                         <form >
                             <div class="credential">
                                 <label for = "username">Email</label>
                                 <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "text" id = "name" name = "name" required></input>        
                            </div>
                             
 
                             <div class="btn-login">
                                 <button type = "submit" onClick = {sendEmail} >Reset</button>
                             </div>
                         </form>
                         <a class = "register" href = "register">Don't have an account? Create one now!</a><br></br>
                         
                     </div>
                     
                 </div>
             </div>
         </section>
         
         <section class = "contact-info">
             <div class="container">
                 <div class="contact-left">
                     <h5>Contact Us</h5>
                     <ul>
                         <li>contact.viewrado@gmail.com</li>
                     </ul>
                 </div>
                 <div class="contact-right">
                     <h5>Contributers</h5>
                     <ul class="contributer">
                         <li>Mimi Rai</li>
                         <li>Rudra Goel</li>
                     </ul>
                 </div>
         
             </div>
         </section>
     </body>
   );
 }
 
 export default App;
 