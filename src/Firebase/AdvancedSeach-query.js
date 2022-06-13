import { query, where, getDocs } from "firebase/firestore"
import zipcodes from 'zipcodes-nearby'



const queryByActivityType = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("Categories", "in", params))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}

const queryByStars = async (collectionRef, params) => {
    console.log('typeof params')
    console.log(typeof params)
    const queryRef = query(collectionRef, where("Stars", ">=", parseInt(params)))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}

const queryByZIP = async (collectionRef, params) => {
    
    let nearby = await zipcodes.near(params.Zip[1], params.Zip[0])

    const queryRef = query(collectionRef, where("Zip", "in", nearby))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}
const queryByCity = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("City", "==", params))
    
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                
                ret.push(document.data())
            })
        })
    return ret
}
const queryByIntensity = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("Activity Intensity (L, M, H)", "==", params))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}
const queryByAudience = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("Family-Adult Only-Children Only", "==", params))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}
const queryByMinPrice = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("Price Min", ">=", params))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}
const queryByMaxPrice = async (collectionRef, params) => {
    
    const queryRef = query(collectionRef, where("Price Max", "<=", params))
    let ret = []
    await getDocs(queryRef)
        .then((snapshot) => {
            snapshot.docs.forEach((document) => {
                ret.push(document.data())
            })
        })
    return ret
}

export {queryByActivityType, queryByCity, queryByIntensity, queryByMaxPrice, queryByMinPrice, queryByZIP, queryByAudience, queryByStars}