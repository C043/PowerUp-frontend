import { useEffect, useState } from "react"
import SingleReviewComponent from "../singleReviewComponent/SingleReviewComponent"
import { useDispatch, useSelector } from "react-redux"

const ReviewsComponent = ({ gameId }) => {
  const reviews = useSelector(store => store.reviews)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setError] = useState(false)

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  const url = import.meta.env.VITE_URL

  const fetchReviews = async () => {
    setIsLoading(true)
    setError(false)
    try {
      const resp = await fetch(url + "/reviews/" + gameId, {
        headers: {
          "Authorization": "Bearer " + token
        },
      })
      const data = await resp.json()
      if (resp.ok) {
        dispatch({ type: "REVIEWS", payload: data })
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
      {reviews.slice(-5)
        .map(rev => <SingleReviewComponent
          key={rev.id}
          content={rev.content}
          rating={rev.rating}
          user={rev.user}
        />
        )}
    </div>
  </div>
}

export default ReviewsComponent
