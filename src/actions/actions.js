import * as api from '../api'

//Action Creators are function that return actions

export const getLocationsBasicSearch  = (params) => async (dispatch) => { //the use of two arrow functions is with redux-thunk because fetching data is an asynchronous method
    try {
        console.log(params)
        const data = await api.fetchLocationsBasicSearch(params);
        //console.log(data.data)
       // console.log('method first, then dispatch')
        //console.log(data)
        dispatch({ type: "GET_LOCATIONS_BASIC_SEARCH", payload : data })
       /// console.log(dispatch({ type: "GET_LOCATIONS_BASIC_SEARCH", payload : data }).payload.data)

    } catch (error) {
        console.log(error)
    }
} 
export const searchFAQ = async (params) => {
    try {
        
        const data = await api.fetchFAQs(params);
        
        return data.data
        //dispatch({ type: "FETCH_FAQS", payload: data.data })
    } catch (error) {
        //console.log(error)
    }
}
export const postReview = (name, review) => async(dispatch) => {
    await api.addReview(name, review)

    dispatch({ type: "POST_REVIEW", payload: review })
}
export const getLocationByID = (id) => async(dispatch) => {
    const { data } = await api.getLocationById(id)
   //console.log(data)
   localStorage.setItem("location", JSON.stringify(data))//this is reserving space in the web applications memory for creating a "profile" item where the data is in the action.data

    dispatch({ type: 'LOCATION_BY_ID', payload: data })
}
export const getLikedLocations = (locationIds) => async(dispatch) => {
    console.log("the ids of the locations")
    console.log(locationIds)
    const { data } = await api.getFavoriteLocations(locationIds)
    console.log("data after being returned")
    console.log(data)
    dispatch({ type:"FETCH_FAVORITE_LOCATIONS", payload: data })
}

export const likeLocation = (params) => async (dispatch) => {
    console.log(params)
    const user = await api.likeLocation(params)
    console.log("user in the actions method")
    console.log(user)
    const oldUser = JSON.parse(localStorage.getItem('profile'))

    const data = {result: user.data, token: oldUser.token }

    localStorage.setItem("profile", JSON.stringify(data))
}
export const registerUser = (params, history) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(params);
        console.log("data of authentication")
        console.log(data)
        dispatch({ type: "AUTH", data })
        history('/myAccount')

    } catch (error) {
        console.log(error.message)
    }
}
export const checkUser = (params, history) => async (dispatch) => {
    try {
        const {data} = await api.checkUser(params) 

        dispatch({ type: "AUTH", data})
        history('/myAccount')
        
    } catch (error) {
        console.log(error)
    }
}

export const getLocationsAdvancedSearch = (params, page) => async (dispatch) => {
    try {
        console.log("5th time app is onvoked")
        const { data } = await api.fetchLocationsAdvancedSearch(params, page)
        console.log("6th time app is onvoked")
        console.log("data")
        console.log(data)
        dispatch({ type: "GET_LOCATIONS_ADVANCED_SEARCH", payload: data })
        
    } catch (error) {
        console.log(error)
    }
}




  