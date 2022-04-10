/**
 * THIS file serves as the connection point between the client and the backend servers.
 * All frontend actions that need service are directed from the webpage --> to the action --> then an API call is made from this file
 * Each operation that requires service from the database or handles business logic is connected via the following API calls
 * 
 * Axios is imported as a way for the static web pages to contact the backend server via HTTPS
 */
import axios from 'axios'

/**
 * The following server as the base URL to the backend server
 * Every call to the backend server will start with the following URL and will have additional strings passed through the URL as add-ons
 * 
 * The backend server is hoted on Heroku 
 */
const url = 'https://view-rado.herokuapp.com/posts'
const urlUsers = 'https://view-rado.herokuapp.com/users'


/**
 * When the user types in one name of the location into the main search bar, this api call is made
 * This is essentially a variable callback function and the only line of code is the type of HTTP request called from the AXIOS imported variable
 * The first parameter is the URL of where to hit -> the backend server routes file handles catching all of the requests thrown to that URL
 * The second parameter is the JSON object parameter that is passed as the request's body
 * @param {JSON Object} params 
 * @returns JSON Object of one location as a result of the query
 */
export const fetchLocationsBasicSearch = (params) => axios.post(url, params)

/**
 * When the user wishes to apply certain advanced filters to the query, this api is called
 * This is essentially a variable callback function and the only line of code is the type of HTTP request called from the AXIOS imported variable
 * The first argument to the request is the url with an appended string to denote that and advanced search has been made and a specifier pointing to the current page
 * The backend server will pull the page number from the URL parameters
 * The second argument is the JSON object containg the query information  
 * @param {JSON Object} params 
 * @param {Integer} page 
 * @returns JSON Object of many locations as a result of the query
 */
export const fetchLocationsAdvancedSearch = (params, page) => axios.post(url+`/advanced?page=${page}`, params)

/**
 * When the user is at the FAQ page and they search questions, this api is called
 * This is essentially a variable callback function and the only line of code is the type of HTTP request called from the AXIOS imported variable
 * The first variable is the URL of the backend server of the fetchFAQs
 * The second parameter is the String in which the user searched for encapsulated as a JSON Object
 * @param {JSON Object} params 
 * @returns An Array of JSON objects -> each containing the deatils of one FAQ
 */
export const fetchFAQs = (params) => axios.post(url + "/faq", params)


/**
 * This api is called everytime the user wished to click on a location card and more information needs to be quried about the location
 * This is essentially a variable callback function and the only line of code is the type of HTTP request called from the AXIOS imported variable
 * There is only one argument made to the axios post call 
 * This is the url with the id field and the passed id following 
 * The backend server pulls the id from the URL params
 * @param {String} params 
 * @returns JSON object conatinaing the details of one location
 */
export const getLocationById = (params) => axios.post(`${url}/id/${params}`)

/**
 * When the user is authenticated, or wishes to view their account details, their favortie locations appear
 * This api call is made and an array of the liked locations' IDs are passed as parameters
 * This is essentially a variable callback function and the only line of code is the type of HTTP request called from the AXIOS imported variable
 * The first argument in the URL string where the second argument is the array of liked locations' ids
 * @param {Array} params 
 * @returns an array with each element being a JSON object containing the details of one location
 */
export const getFavoriteLocations = (params) => axios.post(`${url}/getLikedLocations`, params)

/**
 * This method essentailly sends the id of the location that the user liked and it stores that ID into an array field of the user
 * the first argument is the url string and the second argument is the id 
 * @param {JSON Object} id 
 * @returns a JSON object the the updated version of the user's details
 */
export const likeLocation = (id) => axios.post(`${url}/id/${id.locationId}/likeLocation`, id)

/**
 * This method is invoked every time the user wishes to apply a review to the location's own page
 * It sends both the name and the actual review as a second paramether through an array
 * The first argument is the URL string pointing to the specific routes and business logic to-be-executed when the backend recieves this request 
 * @param {String} name 
 * @param {JSON Object} review 
 * @returns The updated JSON Object of the location to be stored locally on the client's machine
 */
export const addReview = (name, review) => axios.post(`${url}/id/${name}/addReview`, [name, review])


/**
 * This method essentially posts to the database by passing the credentails, and adding a document to the database.
 * It uses a new url than stated above because this refers completely differently than the locations -> what the other calls were made for
 * Because this is used entirely for authentication purposes, new URL endpoints are used and the backend will handle them appropriatley
 * It passes the JSON Credentails as the second argument
 * @param {JSON Object} params 
 * @returns The JSON Object conatinaing the credentails of the new user
 */
export const registerUser = (params) => axios.post(urlUsers + '/registerUser', params)

/**
 * This method is invoked when the user wishes to authenticate into their ViewRado account
 * The url is passed as the first argument and the attempted credentails are passed as the second
 * @param {JSON Object} params 
 * @returns the JSON Object conatinaing the credentails of the authenticated user
 */
export const checkUser = (params) => axios.post(urlUsers + '/login', params)
