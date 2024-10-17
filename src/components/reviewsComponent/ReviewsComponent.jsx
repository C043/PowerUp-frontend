import { useEffect, useState } from "react"
import SingleReviewComponent from "../singleReviewComponent/SingleReviewComponent"

const ReviewsComponent = ({ gameId }) => {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setError] = useState(false)

  const token = localStorage.getItem("token")

  const fetchReviews = async () => {
    setIsLoading(true)
    setError(false)
    try {
      const resp = await fetch("http://localhost:3001/reviews/" + gameId, {
        headers: {
          "Authorization": "Bearer " + token
        },
      })
      const data = await resp.json()
      console.log(data)
      if (resp.ok) {
        setReviews(data)
      } else throw new Error(data.message)
    } catch (error) {
      setError(true)
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return <div className="mt-3">
    <p className="h2">Reviews</p>
    {reviews.length === 0 && <p>No reviews yet, add one!</p>}
    <div className="d-flex flex-column">
      {reviews.map(rev => <SingleReviewComponent key={rev.id} content={rev.content}
        rating={rev.rating}
        user={rev.user}
      />
      )}
    </div>
  </div>
}

export default ReviewsComponent
