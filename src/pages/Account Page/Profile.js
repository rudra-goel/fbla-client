import React, { useState } from 'react'
import { updateUserPassword, updateUserEmail } from "../../Firebase/firestore-query"

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
      <div class="current-account-info">
        <label>Name: {user.Name}</label><br></br>
        <label>Email: {user.email}</label>
      </div>
      <div class="update-account-container">
        <h2>------------------Update Account Credentails------------------</h2>
        <div class="oldPass-container">
          <label>Old Password:</label>
          <input type="password" value={oldPass} onChange={(e) => setOldPass(e.target.value)} />
        </div>
        <div class="update-email">
          <h3>Update Email</h3>
          <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
          <button onClick={updateEmailAttempt}>Update</button>
        </div>
        <div class="update-password">
          <h3>Update Password</h3>
          <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <button onClick={updatePassAttempt}>Update</button>
        </div>
      </div>
    </div>
  )
}
