//this is a reducer == it is a function that accepts the state of the application and the action - its type
//this function will be used in the ./index.js file where it is passed into the combineReducers function

export default  (posts = [], action) => {
    switch (action.type) {
        case "LIKE_LOCATIONS":
            return [action.payload]
        case "FETCH_FAVORITE_LOCATIONS":
            console.log("inside reduce and")
            console.log(action.payload.data)
            return {...posts, places: action.payload};
        case "GET_LOCATIONS_BASIC_SEARCH":
            return {...posts, places: action.payload};//this only returns the value of the location sent to the client by the server and so the state variables are then onoly set to the location given.
        case "GET_LOCATIONS_ADVANCED_SEARCH":
            console.log("action.payload")
            console.log(action.payload)
            return {
                ...posts,
                places:action.payload.resData,
                currPage: action.payload.currentPage,
                numPages: action.payload.numPages
            }; 
        case "FETCH_FAQS":
            //console.log("DISPATCHED FAQ")
            //console.log(action.payload)
        case "REGISTER_USER":
            return [...posts, action.payload];
        
        case "LOCATION_BY_ID":
            localStorage.setItem("location", JSON.stringify({ ...action?.payload}))//this is reserving space in the web applications memory for creating a "profile" item where the data is in the action.data
        default:
            return posts;
    }
}