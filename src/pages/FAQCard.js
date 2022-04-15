/**
 * This file is the React Component for each individual FAQ component
 * It takes in the neceassary data of each FAQ through props and puts it into an HTML format
 * The special thing about this component is that the class for each div is dynamic
 *  --> the CSS then reads each compoenent differently based on whether or not the FAQ div has a class that is opened
 * 
 * The first import serves as the styling for the compoenent
 */
import React from 'react'

export default function FAQCard({ faq, index, toggleFAQ }) {
  
  return (
    <div 
      className={"faq " + (faq.open ? 'open' : '')} 
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
        {faq.Question}
      </div>
      <div className="faq-answer">
        {faq.Answer}
      </div>
      
    </div>
  )
}
