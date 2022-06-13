import React, { useEffect, useState } from 'react'
import {  CircularProgress } from '@material-ui/core'
import Review from "./Review"
import { getMyReviews } from '../../Firebase/firestore-query'
import "./MyReviews.css";
export default function MyReviews({ user }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function getReviews() {
      setLoading(true)
      let ret = await getMyReviews(user.uuid)
      setReviews(ret)
      setLoading(false)
    }
    getReviews()
  }, [])


  return (
    <div>
      <br></br>
      <h1 class="review-section-title">My Previous Reviews</h1>
      <br></br>
      {
        !loading ? (
        reviews.map((review, i) => {
          return (
            <Review individualReview = {review} key={i+1} number={i+1} />
          )
        })) : (
          <CircularProgress />
        )
      }
    </div>
  )
}
