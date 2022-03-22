import './login.css'

import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function loginUser(event) {
    event.preventDefault()//prevent the form to reload to a different page when submitting
    const response = await fetch('http://localhost:1337/api/login', { //THIS IS THE CONNECTION STATEMENT BETWEEN THE REACT SERVER AND THE NODEJS SERVER
      method: 'POST', // WE ARE USINGT HE POST METHOD
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email, 
        password
      })
    })

    const data = await response.json()
    if (data.user){
      console.log(data.user)
      window.location.href = "/myAccount"
    }
    console.log(data)
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
                            <a class = "register" href = "register">Register</a>
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
                                <input value = {email} onChange = {(e) => setEmail(e.target.value)} type = "text" id = "name" name = "name" required></input>
                            </div>
                            <div class="credential">
                                <label for = "password">Password</label>
                                <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" id = "password" name = "password" required></input>
                            </div>

                            <div class="btn-login">
                                <button type = "submit">Login</button>
                            </div>
                        </form>
                    </div>
                    <div class= "createAcc">
                        <a class = "register" href = "register">Create an account</a>
                    </div>
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
