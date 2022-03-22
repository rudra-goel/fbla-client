import './register.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {registerUser} from '../../actions/actions'
import { GoogleLogin } from 'react-google-login'
import {  CircularProgress, Grid } from '@material-ui/core'

function App() {

  const [postData, setPostData] = useState({ 
      name: '', 
      email: '', 
      password: '', 
      confpassword: ''})//wrapping all of the data that user entered into a postData array
      
  const dispatch = useDispatch();
  const history = useNavigate()
  const [loading, setLoading] = useState(false);

  /*
  The following code is outlined for the google O-authentication 
  will be done in later development stages
    <GoogleLogin clientId = "321003506064-aa3m1bh79tvtr06g5gnr9o821l5rklp6.apps.googleusercontent.com" render={(renderProps) => (
                          <button class = "google-register" onClick = {renderProps.onClick} >Register With Google!</button>
                      )} onSuccess = {googleSuccess} onFailure = {googleFailure} cookiePolicy = "single_host_origin" />
                      
  */
    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: 'AUTH', data: {result, token} })
        } catch (error) {
            console.log(error)
        }finally {
            history('/myAccount')
        }
    }
    const googleFailure = () => {
        console.log("google sign in was unsuccessful")
    }
  function handleSubmit(event) {

    //console.log('handlesubmit')
    event.preventDefault()//prevent the form to reload to a different page when submitting
    try {
        setLoading(true)
        dispatch(registerUser(postData, history))//first call of the registerUser fution imported from actions/posts and then it is dispatched 
        
    } catch (error) {
        console.log(error)
    }

    //window.location.href = '/'
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
                      loading ? <div><CircularProgress /> We are setting up you account</div> : <div></div>
                  }
              </div>
          </div>
      </section>

      <section class = "contact-info">
          <div class="container">
              <div class="contact-left">
                  <h5>Contact Us</h5>
                  <ul>
                      <li>Name</li>
                      <li>Email</li>
                      <li>Number</li>
                  </ul>
              </div>
              <div class="contact-right">
                  <h5>Contributers</h5>
                  <ul class="contributer">
                      <li>Person1</li>
                      <li>Person2</li>
                  </ul>
              </div>
      
          </div>
      </section>
  </body>
  );
}

export default App;
