import { db, auth } from "./firebase-config.js";
import { collection, query, where, getDocs, limit, addDoc, getDoc, doc, updateDoc } from "firebase/firestore"
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

const getFavoriteLocations = async (IDArray) => {
    let ret = []
    for(let i =0; i < IDArray.length; i++) {
        const location = await queryLocationByID(IDArray[i])

        ret.unshift(location)
    }

    return ret;
}

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

const createUser = async (email, password, name) => {
    const collectionRef = collection(db, "Users")
    try {
        
        let userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        const docRef = await addDoc(collectionRef, {
            email: userCredentials.user.email,
            Name:name,
            uuid: userCredentials.user.uid, 
            likedLocations: []
        })
        await getDoc(docRef)
            .then((doc) => {
                userCredentials = doc.data()
            })
        return userCredentials
    } catch (error) {
        console.log(error)
    }
}

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

const forgotPassword = async (email) => {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email, {url:'http://localhost:3000/login'})
}

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
        queryFAQs, forgotPassword, createNewTrip, getMyTrips, updateATrip}