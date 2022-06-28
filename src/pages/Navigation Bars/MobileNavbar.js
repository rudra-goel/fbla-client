import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { GiHamburgerMenu } from "react-icons/gi"
import "./MobileNavbar.css"
export default function MobileNavbar({ loggedIn }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  const [open, setOpen] = useState(false)
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
    <div class="nav-mobile-container">
        <div class="hamburger">
            <GiHamburgerMenu 
                size="40px"
                onClick={() => setOpen(!open)}
            />
        </div>
        {
            open ? 
            <div class="mobile-navbar">
                <div class="logoimg-mobile"/>
                {/* <a class="logo-mobile">View<span>Rado</span></a> */}
                <a class="return-home-mobile" href="/" >Home</a>
                <a class = "faq-mobile" href = "/faqs" >FAQs</a>
                    {user?.uuid ? (
                        <a class="myacc-mobile" href='/myAccount/savedLocations'>Account Page</a>
                    ) : (
                        <div></div>
                    )}
                
                {user?.uuid ? (
                    <>
                        <label>Hello {user.Name}!</label>
                        <button class="logout-mobile" value="logout" onClick={logoutUser}>Logout</button>
                    </>

                ) : (
                    <>
                    {
                        loggedIn ? <></> : (
                        <div class="login-register-btns">
                            <a class="login-mobile" href="/login">Login</a>
                            <a class = "register-nav-mobile" href = "/register">Register</a>
                        </div>
                        )
                    }
                    </>
                )}
            </div> : <div/>
        }
        
    </div>
    
)
}
