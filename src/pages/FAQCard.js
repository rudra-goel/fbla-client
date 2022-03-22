import React from 'react'

export default function FAQCard({ faq, index, toggleFAQ }) {
  console.log("in the card")
  console.log(faq)

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
