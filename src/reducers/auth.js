const authReducer = (state = {authData:null}, action) => {
    switch (action.type) {
        case "AUTH":
            console.log(action.data)
            localStorage.setItem("profile", JSON.stringify({ ...action?.data}))//this is reserving space in the web applications memory for creating a "profile" item where the data is in the action.data
            return {...state, authData:action?.data }//we then return the state variables and the data within it
        case "LOGOUT":
            localStorage.clear()//clears all the storage when the user logs out
        case "CHECK_USER":
            console.log("action.data")
            console.log(action.payload)
            localStorage.setItem("profile", JSON.stringify({...action?.payload}))
            return {...state, authData:action?.payload}
        default:
            return state
    }
}

export default authReducer

