import React from 'react'

import MobileNavbar from "./MobileNavbar"
import DesktopNavbar from "./DesktopNavbar"

import "./NavigationBar.css"

export default function NavigationBar({ atLogin }) {
    const user = JSON.parse(localStorage.getItem('profile'))

    
  return (
    <div>
      <div class="desktop">
        <DesktopNavbar loggedIn = {atLogin} />
      </div>
      <div class="mobile">
        <MobileNavbar loggedIn = {atLogin} />
      </div>
    </div>
  )
}
