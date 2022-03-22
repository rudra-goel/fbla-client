import './login.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import {  CircularProgress, Grid } from '@material-ui/core'

import { checkUser } from "../../actions/actions"

function App() {
    const dispatch = useDispatch()
    const [loginData, setLoginData] = useState({email: '', password: ''})
    const history = useNavigate()
   // const location = useLocation()
   const [loading, setLoading] = useState(false);

  async function loginUser(event) {
    event.preventDefault()//prevent the form to reload to a different page when submitting
    try {
        setLoading(true)
        dispatch(checkUser(loginData, history))
        setLoading(false)

    } catch (error) {
        console.log(error)
    }finally{
        //history('/myAccount')
    }

  }

  return (
    <body>
        <div class="navbar">
            <div class="container">
                <nav>

                    <a class="logo" href="/">View<span>Rado</span></a>

                    <div class = "top-left">
                            <a class = "return-home" href = "/">Home</a>
                    </div>

                    <div class = "top-right">
                            
                    </div>

                    

                </nav>
            </div>
        </div>


        <section class = "hero" >
            <div class="specificformat">
                <div class = "container">
                    <h1>Login</h1>
                    <div class = "enter-credentials">
                        <form onSubmit = {loginUser}>
                            <div class="credential">
                                <label for = "username">Email</label>
                                <input value = {loginData.email} onChange = {(e) => setLoginData({...loginData, email: e.target.value})} type = "text" id = "name" name = "name" required></input>                            </div>
                            <div class="credential">
                                <label for = "password">Password</label>
                                <input value = {loginData.password} onChange = {(e) => setLoginData({...loginData, password: e.target.value})} type = "password" id = "password" name = "password" required></input>                            </div>

                            <div class="btn-login">
                                <button type = "submit">Login</button>
                            </div>
                        </form>
                        <a class = "register" href = "register">Don't have an account? Create one now!</a>
                    </div>
                    {
                      loading ? <CircularProgress /> : <div></div>
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
