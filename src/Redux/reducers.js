//this is a reducer == it is a function that accepts the state of the application and the action - its type
//this function will be used in the ./index.js file where it is passed into the combineReducers function

const initialState = {
    Locations:[], 
    currentUser:{},
    FAQs:[],
    LocationInDetail:{}, 
    numPages: 0,
    currentPage: 1
}

const reducer = (state = initialState, action) => {
    
    switch (action.type) {
        case "QUERY_LOCATIONS":
            return {
                Locations: action.payload,
                currentUser: state.currentUser,
                FAQs:state.FAQs,
                LocationInDetail:state.LocationInDetail, 
                numPages: action.payload.length / 4, 
                currentPage: 1
            }
        case "DELETE_FROM_SAVED":
            console.log("DELETE_FROM_SAVED")
            console.log(state)
            Object.assign(state.Locations, action.payload)
            return{
                ...state,
                Locations: action.payload
            }
        case "FETCH_FAQS":
            return {
                Locations: state.Locations,
                currentUser: state.currentUser,
                FAQs:action.payload,
                LocationInDetail:state.LocationInDetail,
                numPages: state.Locations.length / 4, 
                currentPage: 1
            }
        case "LOGOUT":
            console.log("DISPATCHED TO LOGOUT")
            localStorage.removeItem("profile")
            return state
        case "POST_REVIEW":
            for(let i = 0; i < state.Locations.length; i++){
                if (state.Locations[i].itemID = action.payload.itemID){
                    state.Locations[i] = action.payload.itemID
                }
            }
            return {
                Locations: state.Locations,
                currentUser: state.currentUser, 
                FAQs: state.FAQs, 
                LocationInDetail: state.LocationInDetail,
                numPages: state.Locations.length / 4,
                currentPage: 1
            }
        case "NEXT_PAGE":
            console.log("action.payload in reducer")
            console.log(action.payload)
            return {
                Locations: state.Locations,
                currentUser: state.currentUser, 
                FAQs: state.FAQs, 
                LocationInDetail: state.LocationInDetail,
                numPages: state.Locations.length / 4,
                currentPage: action.payload
            }
        default:
            return state;
    }
}

export { reducer }