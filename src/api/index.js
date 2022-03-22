import axios from 'axios'
//each url is associated with its own CRUD opp. this one on the following line only returns all the posts because in localhost:1337/posts/ returns all the posts from the backend
//we would need to make more urls and ths create more arrow functions and export them for the frontend to use 
const url = 'https://view-rado.herokuapp.com/posts'
const urlUsers = 'https://view-rado.herokuapp.com/users'

export const fetchLocationsBasicSearch = (params) => axios.post(url, params)
export const fetchLocationsAdvancedSearch = (params, page) => axios.post(url+`/advanced?page=${page}`, params)
export const fetchFAQs = (params) => axios.post(url + "/faq", params)

export const getLocationById = (params) => axios.post(`${url}/id/${params}`)
export const getFavoriteLocations = (params) => axios.post(`${url}/getLikedLocations`, params)
export const likeLocation = (id) => axios.post(`${url}/id/${id.locationId}/likeLocation`, id)
export const addReview = (name, review) => axios.post(`${url}/id/${name}/addReview`, [name, review])


export const registerUser = (params) => axios.post(urlUsers + '/registerUser', params)
export const checkUser = (params) => axios.post(urlUsers + '/login', params)



