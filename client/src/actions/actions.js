/**
 * This file is the middle management system between the static page files and the API calls to the backend server.
 * Essentially, anny action that requires business logic handling calls functions declared in this file
 * 
 * We first import all of the API calls from the API file 
 */
import * as api from '../api'

/**
 * This file parses through the data passed by the frontend
 * It makes the data api call to fetch the locations performed by a basic - name only - search query
 * After recieving data, it is then dispatched to the global state of varibales
 * The type specifies which state the data is stored in 
 * The payload represents the data returned
 * 
 * The Structuring of this callback variable is different
 * We use the redux-thunk framework to pass the dispatched function as part of this function's method header
 * @param {JSON} params 
 * @returns None explicitely - actions are dispatched where data that is retuned by the backend server is stored in the global state variables
 */
export const getLocationsBasicSearch  = (params) => async (dispatch) => { //the use of two arrow functions is with redux-thunk because fetching data is an asynchronous method
    try {

        const data = await api.fetchLocationsBasicSearch(params);

        dispatch({ type: "GET_LOCATIONS_BASIC_SEARCH", payload : data })

    } catch (error) {
        console.log(error)
    }
} 

/**
 * This file parses through the data passed by the frontend
 * It takes the search strinng the user entered in and passes it through to the api call
 * After recieving data, it is then dispatched to the global state of varibales
 * The type specifies which state the data is stored in 
 * The payload represents the data returned
 * 
 * The Structuring of this callback variable is different
 * We use the redux-thunk framework to pass the dispatched function as part of this function's method header
 * @param {JSON} params 
 * @returns An array of JSON Objects each containing the 
 */
export const searchFAQ = async (params) => {
    try {
        
        const data = await api.fetchFAQs(params);
        
        return data.data
        //dispatch({ type: "FETCH_FAQS", payload: data.data })
    } catch (error) {
        //console.log(error)
    }
}

/**
 * The following method is designed to post a review that an authenticated user posts 
 * It serves as a middleman to the frontend web page and to pointing to the API call to the backend server.
 * It awaits the api call by passing the name and review JSON object
 * The call then returns a confirmation with another JSON object encapsulated to then add to the global state
 * This is as to why the JSON data returned is dispatched
 * @param {String} name 
 * @param {JSON} review 
 * @returns a dispatched action
 */
export const postReview = (name, review) => async(dispatch) => {
    await api.addReview(name, review)

    dispatch({ type: "POST_REVIEW", payload: review })
}

/**
 * This function is invoked everytime the user wishes to learn more about a location
 * When they are on the home page, they have the abilities ot click on certain locations
 * When they click on the location, the client page with point to this function and will invoke it, passing the ID of the location they wish to see
 * This method then queries the DBMS with the ID and is served one JSON object (the location)
 * That JSON object is then stored on the frontends local storage and is also added to the global state of variables through dispatch
 *  
 * @param {String} id 
 * @returns JSON Object of the location
 */
export const getLocationByID = (id) => async(dispatch) => {
    const { data } = await api.getLocationById(id)
    
    localStorage.setItem("location", JSON.stringify(data))

    dispatch({ type: 'LOCATION_BY_ID', payload: data })
}

/**
 * Similar to the method implemented above, the following method is used to query all of the liked locations of a user. 
 * An array of Location IDs are passed through to the function and the api call queries the DBMS for all the liked locations of the user
 * The DBMS will return an array of JSON Objects, each element containing information about the location
 * 
 * That array is then dispatched to be put into the global state of variables with REDUX
 * 
 * This method is invoked every time the user clicks on their account page
 * @param {Array} locationIds 
 * @returns a dispatched action
 */
export const getLikedLocations = (locationIds) => async(dispatch) => {

    const { data } = await api.getFavoriteLocations(locationIds)

    dispatch({ type:"FETCH_FAVORITE_LOCATIONS", payload: data })

}

/**
 * When the user sees a location and wishes to refer back to it, they can like the location with a heart 
 * IF the user is authenticated and they click the heart above the image of the location, this method is invoked
 * The ID of the location is passed as parameters
 * That ID is then POSTED to the database -> specifically to an array field in the user's DBMS document
 * The DBMS Call will return an updated version of the user which is then updated on the frontend to be put into the components state of variables
 * The token of the Old user and the details - including the new liked locations - of the new user are then set to the client's local storage
 * @param {JSON Object} params 
 * @returns null
 */
export const likeLocation = (params) => async (dispatch) => {

    const user = await api.likeLocation(params)

    const oldUser = JSON.parse(localStorage.getItem('profile'))

    const data = {result: user.data, token: oldUser.token }

    localStorage.setItem("profile", JSON.stringify(data))
}
/**
 * When the user wishes to create a new account with ViewRado, they invoke this method
 * The fields the user entered are passed as JSON into the first argument, the second argument is the React Web Hook of History
 * This web hook is used to redirect the webpage to the account page upon completion within the database
 * The new user is then dispatched and their authenticated data is passed to Redux to be stored globally in the website
 * @param {JSON Object} params 
 * @param {History React Web Hook} history 
 * @returns A dispatched action
 */
export const registerUser = (params, history) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(params);

        dispatch({ type: "AUTH", data })

        history('/myAccount')

    } catch (error) {
        //console.log(error.message)
        //console.log("error")
        window.alert("error")
    }
}
/**
 * When the website wished to authenticate a user, this method is invoked from the Login Page 
 * The credentails the user entered into the form are passed as the first parameter to the method -> contains only the email and the decrypted password
 * The histroy react web hook is passed as a second parameter to the method -> this ultimately will redirect the user to their account page if they are successfully authenticated
 * 
 * If they are successfully authenticated, the backend server will issue a JSON Web Token which will last for one hour
 * This token along with the user's details are stored on the client's local storage system
 * The data is also stored on Redux's global storage system
 * @param {JSON Object} params 
 * @param {History React Web Hook} history 
 * @returns A dispatch action
 */
export const checkUser = (params, history) => async (dispatch) => {
    try {
        const {data} = await api.checkUser(params) 

        dispatch({ type: "AUTH", data})

        history('/myAccount')
        
    } catch (error) {
        console.log(error)
    }
}
/**
 * If the user wishes to apply certain filters when they are on the landing page, they invoke this method
 * The JSON Object is passed to this method as the first argument and it contains the query details/limitations
 * The DBMS is queried and it returns an array of JSON Object that each havee locations
 * The current page is also passed as the second argument which aides the DBMS in keeping track of pagination
 * @param {JSON Object} params 
 * @param {Integer} page 
 * @returns a dispatched action
 */
export const getLocationsAdvancedSearch = (params, page) => async (dispatch) => {
    try {
        const { data } = await api.fetchLocationsAdvancedSearch(params, page)

        dispatch({ type: "GET_LOCATIONS_ADVANCED_SEARCH", payload: data })
        
    } catch (error) {
        console.log(error)
    }
}