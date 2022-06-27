/**
 * This file is the React Functional Component for the register page of ViewRado
 * It contains the form input fields and upon submit, it pipelines the data to the backend server to be registered
 * 
 * The first Import statment is the styling of the webpage
 */
import './register.css'

/**
 * useNavigate is another react hook that redirects the webpage
 * Upon authentication, the user is redicrected to thier account page via this hook
 */
import { useNavigate } from 'react-router-dom'

/**
 * The useState is a react hook that manages the variables wihtin this component -> it is imported through React
 */
import { useState } from 'react'

/**
 * useNavigate is another react hook that redirects the webpage
 * Upon authentication, the user is redicrected to thier account page via this hook
 */
import { useDispatch } from 'react-redux'

/**
 * This is a prewritten function that is imported to register the user credentials 
 * This imported function serves as a middleman for the component and the api call to the database
 */
import {registerUser} from '../../Redux/actions'


import NavigationBar from "../Navigation Bars/NavigationBar"
/**
 * This is a component preloaded from @material-ui/core that displays a circular progress bar for UX
 */
import {  CircularProgress } from '@material-ui/core'

import { createUser, queryUser } from "../../Firebase/firestore-query"


/**
 * All React Components follow the same syntax where a function that contains certain business logic is created
 * The return of the function is the HTML that is rendered onto the webpage
 * This function notation allows for the re-render upon variable change
 * @returns HTML Body that is rendered onto the webpage
 */
function App() {
    /**
     * This is the use of the state variables where all of the form data the user enters is tracked in the postData variable
     */
    const [postData, setPostData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confpassword: ''
    })
        /**
         * Initialization of the dispatch function
         */
        const dispatch = useDispatch();
        /**
         * Initialization of the useNavigate Hook
         */
        const history = useNavigate()
        /**
         * This is another React variable that is used for loading
         * When the user clicks the register button, this loading variable is set to true
         * The circular progress bar is then displayed to indicate to the user that loading state is activated
         */
        const [loading, setLoading] = useState(false);

        /**
         * This function is invoked when the user clicks the register button
         * It parses through the form data and dispatches the data by first calling the validate function
         * @param {HTML Object} event 
         */
        async function handleSubmit(event) {
            /**
             * Used to prevent page reloading upon form submit
             * This is standard convention accross React projects
             */
            event.preventDefault()

            if (postData.password != postData.confpassword) {
                //console.log("Passwords aren't matching")
                window.alert("Passwords are not matching")
            } else {
                try {
                    /**
                     * Set the loading state to true to activate the circular loading wheel to indicate the process has started for registration with the database
                     */
                    setLoading(true)
                    const userCredentials = await createUser(postData.email, postData.password, postData.name)
                    localStorage.setItem('profile', JSON.stringify(userCredentials))
                    history('/')
                } catch (error) {
                    console.log(error)
                }
            }



        }
        
    

  return (
  <body>
    <NavigationBar atLogin={true}/>
      <section class="hero-register">
          <h1 class = "register">Register</h1>
          <div class="container">
              <div class="enter-credentials">
                  <form onSubmit = {handleSubmit}>
                      <div class="name">
                          <label for="name" class="name-label">Name</label>
                          <input class="name-input" value = {postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} type="text" for = "name" id = "name" required></input>
                      </div>
                      <div class="email">
                          <label for="email" class="email-label">Email</label>
                          <input class="email-input" value = {postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} type="email" for = "email" id = "email" required></input>
                      </div>
                      <div class="password">
                          <label for="password" class="password-label">Password</label>
                          <input class="password-input" value = {postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} type="password" for = "password" id = "password" required></input>
                      </div>
                      <div class="password-confirm">
                          <label for="password" class="confirm-label">Confirm Password</label>
                          <input class="confirm-input" value = {postData.confpassword} onChange={(e) => setPostData({ ...postData, confpassword: e.target.value })} type="password" for = "password" id = "password" required></input>
                      </div>                      
                      <div class="btn-register">
                          <button type = "submit" href = '/'>Register</button>
                      </div>
                  </form>
                  {
                      loading ? <div id="regresponse"><CircularProgress /> Your account is being set up</div> : <div></div>
                  }
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
