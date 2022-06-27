import React from 'react'

import MobileNavbar from "./MobileNavbar"
import DesktopNavbar from "./DesktopNavbar"

export default function NavigationBar({ atLogin }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    
  return (
    <>
        <DesktopNavbar loggedIn = {atLogin}/>
        <MobileNavbar loggedIn = {atLogin}/>
      
    </>
  )
}
