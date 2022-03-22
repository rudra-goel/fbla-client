import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./FAQ.css"
import searchBtn from './SearchButton.png'
import { searchFAQ } from '../actions/actions'
import FAQCard from './FAQCard'
import {  CircularProgress, Grid } from '@material-ui/core'

export default function FAQ() {


    const dispatch = useDispatch()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))//this is how to access the user on the localstorage of the web'
    const logout = () => {
        dispatch({ type: "LOGOUT" })
        setUser(null)
    }
    const [search, setSearch] = useState({Search: ""})
    const [results, setResults] = useState([
        {
            Question: "How many locations are on ViewRado?",
            Answer:"There are more then 1400 locations provided by the Colorado State Department."
        }
    ])
    const [loading, setLoading] = useState(false)
    let listOfFaqs = []
    
    const handleSubmit = async () => {
        setLoading(true)
        listOfFaqs = []
        listOfFaqs = await searchFAQ(search)
        setLoading(false)
        console.log("listOfFaqs")

        console.log(listOfFaqs)
        setResults(listOfFaqs)
        
    }

    
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
