import React, { useState } from 'react'
import { updateUserPassword, updateUserEmail } from "../../Firebase/firestore-query"
import "./Profile.css";

export default function Profile({ user }) {
  const [oldPass, setOldPass] = useState("")
  const [updatedEmail, setUpdatedEmail] = useState("")
  const [newPass, setNewPass] = useState("")


  const updateEmailAttempt = () => {
    if (oldPass === ""){
      window.alert("Must specify old password")
    } else {

      updateUserEmail(user.email, oldPass, updatedEmail, user.uuid).then(() => {
        window.alert("Email updated successfully")
      })
    }
  }
  const updatePassAttempt = () => {
    if (oldPass === ""){
      window.alert("Must specify old password")
    } else{

      updateUserPassword(user.email, oldPass, newPass).then(() => {
        window.alert("Password updated successfully")
      })
    }
  }
  return (
    <div>
      <br></br>
      <h1> Profile Information</h1>
      <div class="current-account-info">
        <label><b>Name: </b> {user.Name}</label><br></br>
        <label><b>Email: </b> {user.email}</label>
      </div>

      <h1>Update Account Credentials</h1>
      <div class="update-account-container">
        <div class="oldPass-container">
          <p>Please input your old password to update either your email or your password.</p>
          <label><b>Old Password: </b></label>
          <input class="update-prof-input" type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
        </div>

        <div class="update-email">
          <h3>Update Email</h3>
          <label><b>New Email: </b></label>
          <input class="update-prof-input" type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} /> <br></br>
          <button onClick={updateEmailAttempt} class="updateButton">Update</button>
        </div>
        
        <div class="update-password">
          <h3>Update Password</h3>
          <label><b>New Password: </b></label>
          <input class="update-prof-input" type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} /> <br></br>
          <button onClick={updatePassAttempt} class="updateButton">Update</button>
        </div>
      </div>
    </div>
  )
}
