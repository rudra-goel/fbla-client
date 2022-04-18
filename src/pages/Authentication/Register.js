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
import {registerUser} from '../../actions/actions'

/**
 * This is a component preloaded from @material-ui/core that displays a circular progress bar for UX
 */
import {  CircularProgress } from '@material-ui/core'


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
    function handleSubmit(event) {
        /**
         * Used to prevent page reloading upon form submit
         * This is standard convention accross React projects
         */
        event.preventDefault()

        try {
            if (password != confpassword) {
                console.log("passwords aren't matching")
                window.alert("passwords are not matching")
            }
            else {
                /**
                 * Set the loading state to true to activate the circular loading wheel to indicate the process has started for registration with the database
                 */
                setLoading(true)
                /**
                 * The function to register the user is called where we pass in the data attempted and an object reference to the useNavigate Hook
                 * The details of the authenticated user (token, name, email, etc.) are then piped to the global state of variables via dispatch function
                 */
                dispatch(registerUser(postData, history)) 
            }
        } catch (error) {
            console.log(error)
            console.log("error")
        }
    }

  return (
  <body>
      <section class = "navbar">
          <div class = "navbar">
              <div class="container">
                  <nav>
                      <a class="logo" href="/">View<span>Rado</span></a>

                      <div class = "top-left">
                              <a class = "return-home" href = "/">Home</a>
                      </div>
      
                      <div class = "top-right">
                              <a class = "login" href = "login">Login</a>
                      </div>
      
                      
                  </nav>
              </div>
          </div>
      </section>

      <section class="hero">
          <div class="container">
              <h1 class = "register">Register</h1>
              <div class="enter-credentials">
                  <form onSubmit = {handleSubmit}>
                      <div class="name">
                          <label for="name">Name</label>
                          <input value = {postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} type="text" for = "name" id = "name" required></input>
                      </div>
                      <div class="email">
                          <label for="email">Email</label>
                          <input value = {postData.email} onChange={(e) => setPostData({ ...postData, email: e.target.value })} type="email" for = "email" id = "email" required></input>
                      </div>
                      <div class="password">
                          <label for="password">Password</label>
                          <input value = {postData.password} onChange={(e) => setPostData({ ...postData, password: e.target.value })} type="password" for = "password" id = "password" required></input>
                      </div>
                      <div class="password">
                          <label for="password">Confirm Password</label>
                          <input value = {postData.confpassword} onChange={(e) => setPostData({ ...postData, confpassword: e.target.value })} type="password" for = "password" id = "password" required></input>
                      </div>                      
                      <div class="btn-register">
                          <button type = "submit" href = '/'>Register</button>
                      </div>
                  </form>
                  {
                      loading ? <div><CircularProgress /> Your account is being set up</div> : <div></div>
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
