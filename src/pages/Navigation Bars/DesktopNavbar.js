import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import "./DesktopNavbar.css"
export default function DesktopNavbar({ loggedIn }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const history = useNavigate()
    /**
     * This function is used to logout the user
     * IF the user clicks the logout button, this function is invoked
     */
     const logoutUser = () => {
        
      /**
       * The user profile details are removed through the global state of variables
       * Through the dispatch actions
       */
      localStorage.removeItem('profile')
      //dispatch(logout())
      /**
       * The user is forcefully redirected ot the landing page of the applications
       */
      history('/')
      /**
       * The local details of the user are set to null by uptading the user's details
       */
      setUser(null)
  }
  return (
    <div class="navbar">
      <div class="container">
          <nav>
              <div class="logoimg">
              </div>
              <a class="logo" >View<span>Rado</span></a>

              <div class="top-left">
                  <a class="return-home" href="/" >Home</a>
                  <a class = "faq" href = "/faqs" >FAQs</a>
              </div>
              <div class="myAcc">
                  {user?.uuid ? (
                      <a class="myacc" href='/myAccount/savedLocations'>Account Page</a>
                  ) : (
                      <div></div>
                  )}
              </div>
              <div class="top-right">

                  {user?.uuid ? (
                      <div class="if-logged-in-navbar">
                          <label>Hello {user.Name}!</label>
                          <button class="logout" value="logout" onClick={logoutUser}>Logout</button>
                      </div>

                  ) : (
                      <>
                      {
                        loggedIn ? <></> : (
                          <div class="if-not-logged-in-navbar">
                            <a class="login" href="/login">Login</a>
                            <a class = "register" href = "/register">Register</a>
                          </div>
                        )
                      }
                      </>
                      
                  )}

              </div>

          </nav>
      </div>
  </div>
  )
}
