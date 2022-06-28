import { db, auth } from "./firebase-config.js";
import { collection, query, where, getDocs, limit, addDoc, getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import {queryByActivityType, queryByCity, queryByIntensity, queryByMaxPrice, queryByMinPrice, queryByZIP, queryByAudience, queryByStars} from "./AdvancedSeach-query.js"
import _ from "lodash"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signout, getAuth, updateEmail, updatePassword, EmailAuthProvider, sendPasswordResetEmail } from "firebase/auth"
import keyword_extractor from "keyword-extractor"


const getRandomLocations = async () => {
    
    /**
     * Reference to the Locations Collecction stored in Firebase Firestore
     * We pass the database reference as the first argument and the name of the collection as the second
     */
    const collectionRef = collection(db, "Locations");

    let ret  = []
    /**
     * The following generate random IDs 
     * This is done by generating a random number from 10,000 -> 11,467 and appending "a" to the front of it
     * All of the random IDs are pushed to the randomArr array
     */
    let randomArr = []
    for (let i = 0; i < 20; i++){
        let rand = randomNumber(10000, 11467)
        while(randomArr.includes(rand)){
            rand = randomNumber(10000, 11467)
        }
        randomArr.push(rand)
    }
    for (let i = 0; i < randomArr.length;i++){
        randomArr[i] = 'a'+randomArr[i];
    }
    /**
     * This then loops thorugh each random ID 
     * In each loop, it creates a new Query Reference that searches for documents that match a random ID
     * We then read the query with the getDocs function and invoke a callback when the Promise is completed
     * Each location found is then pushed to the ret array
     */
    for (let i = 0; i < randomArr.length;i++){
        const queryRef = query(collectionRef, where("__name__", "==", randomArr[i]))
        
        await getDocs(queryRef)
            .then((snapshot) => {
                snapshot.docs.forEach((location) => {
                    ret.push({ ...location.data() })
                })
            })
    }    
    /**
     * Response is a 201 validated code
     * Response body contains an array of the random locations
     */
    
    return ret;
}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds one location from the Locations Collection
 * Based on its ID
 * @param {String} LocationID 
 * @returns JSON Object
 */
const queryLocationByID = async (LocationID) => {
    const collectionRef = collection(db, "Locations")
    const queryRef = query(collectionRef, where("__name__", "==", LocationID))
    let ret;
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((doc) => {
                ret = doc.data();
            })
        })
    return ret;
}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds an array of location from the Locations Collection
 * Based on an array of IDs passes
 * @param {Array} LocationID 
 * @returns Array of JSON Objects
 */
const getFavoriteLocations = async (IDArray) => {
    let ret = []
    for(let i =0; i < IDArray.length; i++) {
        const location = await queryLocationByID(IDArray[i])

        ret.unshift(location)
    }

    return ret;
}

/**
 * Using Collection Refernces, the following creates a query reference
 * In this function, we get the details of the user with the query user method
 * we then create an object to mimic the updated document in Cloud Firestore
 * We then use the UpdateDoc method where we pass a version of the updated document and a reference to it
 * 
 * We then return an updated version of the location now with an appended review to it
 * @param {JSON Object} LocationID 
 * @param {JSON Object} review 
 * @param {String} uuid 
 * @returns Array of JSON Objects
 */
const postReviewToLocation = async (locationDetails, review, uuid) => {

    const reviewCollectionRef = collection(db, "Reviews")
    const userDetails = await queryUser(uuid)
    const reviewRef = await addDoc(reviewCollectionRef, {
        title: review.title,
        givenReview: review.givenReview,
        Stars: review.Stars,
        userUUID: uuid,
        NameOfReviewer: userDetails.Name,
        location: locationDetails.itemID
    })

    locationDetails.Reviews.push(review)
    let updatedStars = 0;
    for(let i =0; i < locationDetails.Reviews.length; i++){
        updatedStars+=locationDetails.Reviews[i].Stars
    }
    console.log('TOTAL STARS')
    console.log(updatedStars)

    updatedStars = updatedStars / locationDetails.Reviews.length

    //get a reference to the location
    const locationRef = doc(db, "Locations", locationDetails.itemID)
    //update the location with the reference made
    await updateDoc(locationRef, {
        Reviews: locationDetails.Reviews,
        Stars: updatedStars
    })
    const newLcationDetails = await queryLocationByID(locationDetails.itemID)
    return newLcationDetails
}

/**
 * This method queries the Review Collection
 * They query is against the Unique User Identification (uuid) to retrieve all of the reviews the user has made
 *  It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such eviews are returned
 * 
 * @param {String} uuid 
 * @returns Array of JSON Objects
 */
const getMyReviews = async (uuid) => {
    const reviewCollectionRef = collection(db, "Reviews")
    const queryRef = query(reviewCollectionRef, where("userUUID", "==", uuid))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((location) => {
                
                ret.push(location.data())
            })
        })

    return ret

}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds one location from the Locations Collection
 * Based on its Name without case sensitivity
 * @param {JSON Object} req 
 * @param {JSON Object} res 
 * @returns JSON Object
 */
const queryByName = async(req, res) => {
    let ret = []
    const { Name } = req
    
    const collectionRef = collection(db, 'Locations')
    const queryRef = query(collectionRef, where("Name (case insensitive)", "==", Name.toLowerCase()))

    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((location) => {
                
                ret.push(location.data())
            })
        })
    console.log('RETURN')
    console.log(ret)

    if (ret.length === 0){
        return ["NO RESULTS"]
    }
    return ret
}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds an array of Locations based on the special params provided
 * This method uses functional exports from the advanced query file
 * It finds queries that individually fit it and the splices to find the unions
 * Those unions are returned
 * @param {JSON Object} params 
 * @param {Integer} page 
 * @returns Array of JSON Objects
 */
const queryWithParams = async(params, page) => {
    
    const collectionRef = collection(db, "Locations")
    
    console.log("REQ BODY PARAMS")
    console.log(params)

    
    let results = {
        Category:-1, 
        Stars:-1,
        ZIP:-1, 
        City:-1, 
        Intensity:-1, 
        Audience:-1, 
    }
    
    
    let matchedResults = []
    let onlyParam = true;
    if(params.Checkbox[0] !== -1) {
        results.Category = await queryByActivityType(collectionRef, params.Checkbox)
        matchedResults = results.Category
        onlyParam = false
        
    }
    if (params.Stars[0] !== -1){
        results.Stars = await queryByStars(collectionRef, params.Stars[0])
        if (onlyParam){
            matchedResults = results.Stars
            onlyParam = false
        } else {
            matchedResults = arrayMatch(matchedResults, results.Stars)
        }
    }
    if (params.Zip.length === 2){
        results.ZIP = await queryByZIP(collectionRef, params)
        if(onlyParam) {
            matchedResults = results.ZIP
            onlyParam = false
        } else{
            matchedResults = await arrayMatch(matchedResults, results.ZIP)
        }
    }
    if (params.City[0] !== -1){
        results.City = await queryByCity(collectionRef, params.City[0])
        if(onlyParam){
            matchedResults = results.City
            onlyParam = false
        } else{
            matchedResults = await arrayMatch(matchedResults, results.City)
        }
    }
    if (params.Intensity[0] !== -1){
        results.Intensity = await queryByIntensity(collectionRef, params.Intensity[0])
        if(onlyParam){
            matchedResults = results.Intensity
            onlyParam = false
        } else{
            matchedResults = await arrayMatch(matchedResults, results.Intensity)
        }
    }
    if (params.Audience[0] !== -1){
        results.Audience = await queryByAudience(collectionRef, params.Audience[0])
        if (onlyParam) {
            matchedResults = results.Audience
            onlyParam = false
        } else{
            matchedResults = await arrayMatch(matchedResults, results.Audience)
        }
    }
    
    console.log(matchedResults.length)
    let newArray = []
    if (matchedResults.length > 20){
        for(let i = 0; i < 20; i++){
            newArray.push(matchedResults[i])
        }
        return newArray
    } else if (matchedResults.length === 0){ 
        return ["NO RESULTS - ADVANCED"]
    }
    
    return matchedResults
}

/**
 * This functional Export essentially adds the location ID to the user's array of liked locations
 * 
 * It first queries the user using the UUID
 * It then creates an updated version of the user object
 * It then updates the user using the updateDoc method
 * It returns the user's updated profile
 * @param {String} locationID 
 */
const postLikedLocation = async (locationID) => {
    const currUserProf = JSON.parse(localStorage.getItem('profile'))

    currUserProf.likedLocations.push(locationID)


    const userID = await queryUserID(currUserProf.uuid)
    const userDocRef = doc(db, "Users", userID)

    await updateDoc(userDocRef, {
        likedLocations: currUserProf.likedLocations
    })

    const newUserProf = await queryUser(currUserProf.uuid)

    localStorage.setItem('profile', JSON.stringify(newUserProf))



}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds one user from the Users Collection
 * Based on its UUID
 * @param {String} uuid 
 * @returns JSON Object
 */
const queryUser = async (uuid) => {

    try {
        const collectionRef = collection(db, "Users")
        const queryRef = query(collectionRef, where("uuid", "==",uuid))
        let ret;
        await getDocs(queryRef)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    console.log(doc.data())
                    ret = doc.data()
                })
            })
        return ret;
        
    } catch (error) {
        console.log(error)
    }

    
}

/**
 * Using Collection Refernces, the following creates a query reference
 * In that reference, we pass the collection from where to query from
 * We then pass the "where function" that takes in the actual NoSQL Version of a query
 * It returns a Query Reference and we then use the GetDocs method to get all the documents in the query snapshot
 * Such locations are returned
 * 
 * This finds one user from the Users Collection
 * Based on its uuid, it returns the document ID of the user
 * @param {String} uuid
 */
const queryUserID = async (uuid) => {

    try {
        const collectionRef = collection(db, "Users")
        const queryRef = query(collectionRef, where("uuid", "==",uuid))
        let ret;
        await getDocs(queryRef)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    console.log(doc.id)
                    ret = doc.id
                })
            })
        return ret;
        
    } catch (error) {
        console.log(error)
    }

    
}

/**
 * This functional export handles all of the searching features for the FAQ page
 * Using the keyword extractor package, this function breaks the search string into an array of key word components
 * These are then queries against the FAQs collection to find any questions that are similar to the keywords
 * 
 * It then retuns an array of FAQs that are similar in question to the search string
 * @param {String} searchString 
 * @returns Array of JSON objects
 */
const queryFAQs = async (searchString) => {
    const collectionRef = collection(db, "FAQs")

    const result = keyword_extractor.extract(searchString.Search, {
        language: 'english',
        remove_digits:true,
        return_changes_case:true,
        remove_duplicates:true
    })
    for (let i = 0; i < result.length; i++){
        result[i] = result[i].toLowerCase()
    }

    const queryRef = query(collectionRef, where("QuestionArray", "array-contains-any", result))
    let ret = []
    await getDocs(queryRef)
            .then((snapshot) => {
                snapshot.docs.forEach((doc) => {
                    //console.log(doc.data())
                    ret.push(doc.data())
                })
            })
    
    return ret;

}

/**
 * This functional export is invoked everytime the register user button is clicked
 * It does two things
 *  --> Create a new user using the Firebase Authentication Service
 *  --> Creates a new document witin the user collection
 * 
 * @param {String} email 
 * @param {String} password 
 * @param {String} name 
 * @returns The JSON Object information about the user
 */
const createUser = async (email, password, name) => {
    /**
     * Create a collection reference to the Users collection
     * We pass the "db" variable as an instance to where the database is
     * We pass a string for the collection title 
     */
    const collectionRef = collection(db, "Users")
    try {
        /**
         * Using the function from Firebase Auth, we create a new user by passing in the auth instance
         * The email and the password
         * This creates a secure and a hashed password that is not stores on ViewRado's Firebase account
         */
        let userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        /**
         * We then create a document reference for the new user we are adding
         * Using the addDoc method, we insert the new user's information
         */
        const docRef = await addDoc(collectionRef, {
            email: userCredentials.user.email,
            Name:name,
            uuid: userCredentials.user.uid, 
            likedLocations: []
        })
        /**
         * We then parse through the newly added doc and return the user's profile information
         * To be stored onto Local Storage
         */
        await getDoc(docRef)
            .then((doc) => {
                userCredentials = doc.data()
            })
        return userCredentials
    } catch (error) {
        console.log(error)
    }
}

/**
 *  This functional export is invoked everytime the login user button is clicked
 * It does two things
 *  --> Checks the user if they are in the databse
 *  --> Uses Auth Services to make sure they exist in the Firebase account
 * 
 * It returns a instance of the user's profile information
 * @param {String} email 
 * @param {String} password 
 * @returns JSON Object
 */
const signInUser = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password)
        console.log("userCredentials")
        console.log(userCredentials)
        const docRef = await queryUser(userCredentials.user.uid)
        return docRef
    } catch (error) {
        return error
    }
}

/**
 * This functional component is responsible for updating the user's credentials'
 * This takes in the necessary credentials
 * Because in order to update the password, Firebase Auth must reverify the user's existing credentials
 * They do this by re logging in the user
 * After the original user is verified with their credentials, an updatePassword functionn is invoked
 * A return of the boolean variable type determines whether the password was updates successfully or not
 * @param {String} email 
 * @param {String} password 
 * @param {String} updatedPassword 
 */
const updateUserPassword = async (email, password, updatedPassword) => {
    const auth = getAuth();
    const user = auth.currentUser
    await signInUser(email, password)
    updatePassword(user, updatedPassword).then(() => {
        return true
      }).catch((error) => {
        window.alert(error)
      });
    
}

/**
 * Thif functional export is used to send an email to the user's email address
 * This email contains a secure link that resets the user's password
 * The link is only active for 12 hours
 * The 3rd arguemnt in the sendPasswordResetEmail is the url to where the user should be renavigated when the reset  
 * @param {String} email 
 * @returns 
 */
const forgotPassword = async (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email, {url:'https://viewrado.com/login'})
}

/**
 *  This functional component is responsible for updating the user's credentials'
 * This takes in the necessary credentials
 * Because in order to update the email, Firebase Auth must reverify the user's existing credentials
 * They do this by re logging in the user
 * After the original user is verified with their credentials, an update email functionn is invoked
 * A return of the boolean variable type determines whether the email was updates successfully or not
 * 
 * Additionally, an update to the databse if performed to ensure the user's Firestore documents are up-to-date
 * @param {String} email 
 * @param {String} password 
 * @param {String} updatedEmail 
 * @param {String} userUUID 
 */
const updateUserEmail = async (email, password, updatedEmail, userUUID) => {

    const auth = getAuth();
    await signInUser(email, password)

    updateEmail(auth.currentUser, updatedEmail).then(async () => {
        const docID = await queryUserID(userUUID)
        const userDocRef = doc(db, "Users", docID)
        await updateDoc(userDocRef, {
            email: updatedEmail
        })

        const newUserProf = await queryUser(userUUID)
        localStorage.setItem('profile', JSON.stringify(newUserProf))
        return true;
    }).catch((error) => {
        window.alert(error)
    })
}

/**
 * This functional is responsible creating a new trip
 * It essentially writes a new document to the database - the Trip Collections
 * It is essential to have the users UUID as part of doucment props because that is how main queries are performed
 * Additioanlly, more cleanup is done so that there is an array that each contains an object 
 * Each object is representitive of a day on their trip
 * @param {String} name 
 * @param {JSON Date Object} start 
 * @param {JSON Date Object} end 
 * @param {Integer} totalPeople 
 * @param {String} uuid 
 * @returns an instance of the Create My Trip
 */
const createNewTrip = async (name, start, end, totalPeople, uuid) => {
    const collectionRef = collection(db, "Trips")
    const dates = getDatesInRange(start, end)
    let locationsOnTrip = []
    dates.map((date) => {
        const objToPush = {
            Date: date,
            LocationsForToday: []
        }
        locationsOnTrip.push(objToPush)
    })
    try {
        const insertedObject = {
            Name: name, 
            startDate: start,
            EndDate: end,
            LocationsOnTrip: locationsOnTrip,
            TotalPeople: totalPeople,
            UUID: uuid
        }
        const tripRef = await addDoc(collectionRef, insertedObject)
        return insertedObject;
    } catch (error) {
        window.alert(error)
    }
}

const getMyTrips = async (uuid) => {
    const tripCollectionRef = collection(db, "Trips")
    const queryRef = query(tripCollectionRef, where("UUID", "==", uuid))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((location) => {
                
                ret.push(location.data())
            })
        })
    if (ret.length === 0){
        return ["NO RESULTS"]
    } else {

        return ret
    }
}

const updateATrip = async (tripToUpdate) => {
    const collectionRef = collection(db, "Trips")
    const queryRef = query(collectionRef, where("Name", "==", tripToUpdate.Name))
    let docID = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                docID = doc.id
            })
        })
    const docRef = doc(db, "Trips", docID)
    

    await updateDoc(docRef, {
        LocationsOnTrip: tripToUpdate.LocationsOnTrip
    })

    return "Success"
}

const deleteSavedLocation = async (newLocations) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const userDocID= await queryUserID(user.uuid)
    const docRef = doc(db, "Users", userDocID)
    let locationID = []
    newLocations.forEach((location) => {
        locationID.push(location.itemID)
    })
    await updateDoc(docRef, {
        likedLocations: locationID
    })
}

function getDatesInRange(startDate, endDate) {
    const date = new Date(Date.parse(startDate));
    const endDateObj = new Date(Date.parse(endDate))
    const dates = [];
  
    while (date <= endDateObj) {
        let month = date.getUTCMonth() + 1; //months from 1-12
        let day = date.getUTCDate();
        let year = date.getUTCFullYear();

        let newdate = year + "-" + month + "-" + day;  
      dates.push(newdate);
      date.setDate(date.getDate() + 1);
    }
  
    return dates;
  }

function randomNumber(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
}

async function arrayMatch(arr1, arr2) {
    var arr = [];  // Array to contain match elements
    for(var i=0 ; i<arr1.length ; ++i) {
      for(var j=0 ; j<arr2.length ; ++j) {
        if(_.isEqual(arr1[i], arr2[j])) {    // If element is in both the arrays
          arr.push(arr1[i]);        // Push to arr array
        }
      }
    }
     
    return arr;  // Return the arr elements
}

export { getRandomLocations, queryLocationByID, queryWithParams, queryByName, 
        createUser, signInUser, queryUser, postLikedLocation, getFavoriteLocations, 
        postReviewToLocation, getMyReviews, updateUserEmail, updateUserPassword, 
        queryFAQs, forgotPassword, createNewTrip, getMyTrips, updateATrip, deleteSavedLocation}