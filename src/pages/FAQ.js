/**
 * This file serves as the page for the FAQs section
 * When the user visits this page, they are borught with a search bar with many search FAQs already loaded
 * Business Logic behind the page:
 *  --> User searches something into the bar and hits the search button
 *  --> The searched string is sent to the backend server via the middleman and API call
 *  --> The database returns an array of JSON objects that match the keywords of the search string
 *  --> The returned array is then fed through another component through props and each subsequent FAQ is loaded
 * 
 * The first import serves as the styling for this page
 */
import "./FAQ.css"
/**
 * React and useState are imported to create this functional component and create varibales to be used in useState
 */
import React, { useState } from 'react'
/**
 * useDispatch is imported for authentication purposes
 * It clears the user's details from the global state if the logout button is clicked
 */
import { useDispatch } from 'react-redux'
/**
 * Image used for the search button
 */
import searchBtn from './SearchButton.png'
/**
 * Middleman Function used to send the search strign to the API and return the array of JSON objects back to the component
 */
import { searchFAQ } from '../actions/actions'
/**
 * The child component of each FAQ card that will be innevitable loaded
 */
import FAQCard from './FAQCard'
/**
 * UX do display that the search has been performed to the user
 */
import {  CircularProgress } from '@material-ui/core'

/**
 * Declaration of the React Functional Component
 * @returns 
 */
export default function FAQ() {

    /**
     * Initialization of the dispatch object
     */
    const dispatch = useDispatch()
    /**
     * Grabbing the user from the localStorage and using it within the component's state variables
     */
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    /**
     * Logout function that is invoked when the user pushes logout
     * It clears the global state of the user and sets the local user to null
     */
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        setUser(null)
    }
    /**
     * This state varibale is used to track the search string which is then passed to the database 
     */
    const [search, setSearch] = useState({Search: ""})
    /**
     * THese are the built in FAQs that are loaded on the client side to be immediatly displayed to the user
     * There are more FAQs in the database --> this only serves to show the most FAQs
     */
    const [results, setResults] = useState([
        {
            Question: "How many locations are on ViewRado?",
            Answer:"There are more then 1400 locations provided by the Colorado State Department."
        }
    ])
    /**
     * This is the loading state of the page 
     * When the user searches a string, this state is true, and the progress wheel is displayed
     */
    const [loading, setLoading] = useState(false)
    /**
     * THis is an array that is declared to track all of the JSON objects returned from the DBMS of the FAQs that match
     */
    let listOfFaqs = []
    /**
     * This function is meant to be executed everytime the user searches an FAQ
     * It first sets the loading state to true to display the progress wheel 
     * It then resets the list of FAQs to be an empty array with zero elements 
     * It then awaits a new list of FAQs by calling the approrpate method from the middleman and the API
     * When the listOfFaqs is then populated, the loading state is set to false to stop displaying the progress wheel
     * the setResults state is updated with the new List of FAQs and the page is rerendered to have the FAQs be displayed
     */
    const handleSubmit = async () => {
        setLoading(true)
        listOfFaqs = []
        listOfFaqs = await searchFAQ(search)
        setLoading(false)
        setResults(listOfFaqs)
    }

    /**
     * This function is essentailly for UX
     * It is able to open and close individual FAQ objects within the page
     * It will first iterate through all of the FAQs through the listOfFaqs array
     * It will then check to see if the index of the FAQ matches the FAQ the user wishes to toggle to
     * It then makes the open state of the FAQ to opposite of what was prevously had
     * After updating the necessary FAQ, the entire results variable is updated
     * @param {Integer} index 
     */
    const toggleFAQ = index => {
        setResults(results.map((faq, i) => {
            if (i === index) {
                faq.open=!faq.open
            } else {
                faq.open = false
            }
            return faq
        }))
    }
    
  return (
    <div class="main">
      <div class="navbar">
            <div class="container">
                <nav>
                    <a class="logo">View<span>Rado</span></a>
                    <div class = "top-left">
                            <a class = "return-home" href = "/" >Home</a>
                            {user?.token ? (
                                <a class="myacc" href='/myAccount'>Account Page</a>                                
                        ) : (
                            <div class="if-not-logged-in-navbar">
                            </div>
                        )}
                    </div>
                        
                    <div class = "top-right">

                        {user?.token ? (
                            <div class="if-logged-in-navbar">
                                <label>Hello {user.result.name}!</label>
                                <button value = "logout" onClick = {logout}>Logout</button>
                            </div>
                            
                        ) : (
                            <div class="if-not-logged-in-navbar">
                                <a class = "login" href = "/login">Login</a>
                                <a class = "register" href = "/register">Register</a>
                            </div>
                        )}
                        
                    </div>        
                </nav>
            </div>
        </div>

        <div class="faq-title">
            <h1>Welcome to Frequently Asked Questions</h1>
        </div>

        <div class="user-input-faq">
            <input type="text" class="faq-input" placeholder="Search FAQs" onChange={(e) => setSearch({Search: e.target.value})}></input>
            <button class='main-search-btn' type='submit' id='main-search-title' onClick={ handleSubmit }>
                <img src={searchBtn} alt="Search" width="45" height="45" ></img>
            </button>
        </div>
        <div class="faqs">
            {
                loading ? (
                    <CircularProgress />
                    ) : (
                        results.map((question, i) => {
                            return <FAQCard faq={ question } index={ i } toggleFAQ = { toggleFAQ } />
                        })
                    )
                    
            }
        </div>
    </div>
  )
}
