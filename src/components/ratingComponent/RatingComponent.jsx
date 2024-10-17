import { useEffect, useState } from "react"
import "./RatingComponent.scss"
import { StarFill, Trash } from "react-bootstrap-icons"
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

const RatingComponent = ({ ratingSetter, gameId, userRating, list }) => {
  const [hover, setHover] = useState(0)
  const [rating, setRating] = useState(userRating)
  const [content, setContent] = useState()
  const [hasError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [alresdyReviewed, setAlreadyRevied] = useState(false)
  const [success, setSuccess] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const token = localStorage.getItem("token")
  const user = useSelector(store => store.user)

  const dispatch = useDispatch()

  const rateGame = async (rat) => {
    try {
      const resp = await fetch("http://localhost:3001/lists/" + list + "/" + gameId, {
        method: "PUT",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          rating: rat
        })
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRating = rat => {
    if (rating === rat) {
      setRating(0)
      ratingSetter(0)
      rateGame(0)
    } else {
      setRating(rat)
      ratingSetter(rat)
      rateGame(rat)
    }
  }

  const postReview = async () => {
    setError(false)
    const method = alresdyReviewed ? "PUT" : "POST"
    try {
      const resp = await fetch("http://localhost:3001/reviews", {
        method: method,
        headers: {
          "Authorization": "Bearer " + token,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          gameId: gameId,
          rating: rating,
          content: content
        })
      })
      const data = await resp.json()
      if (resp.ok) {
        setSuccess(true)
        setAlreadyRevied(true)
        fetchAllReviews()
      } else throw new Error(data.message)
    } catch (error) {
      setError(true)
      setErrorMessage(error.message)
      console.log(error.message)
    }
  }

  const handleSubmit = ev => {
    ev.preventDefault()
    if (rating > 0) {
      setError(false)
      postReview()
    } else {
      setError(true)
      setErrorMessage("Make sure to give at least one star")
    }
  }

  const fetchReview = async () => {
    try {
      const resp = await fetch("http://localhost:3001/reviews/me/" + gameId, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await resp.json()
      if (resp.ok) {
        setAlreadyRevied(true)
        setContent(data.content)
      } else throw new Error(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }

  const fetchAllReviews = async () => {
    setError(false)
    try {
      const resp = await fetch("http://localhost:3001/reviews/" + gameId, {
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
    }
  }

  const deleteReview = async () => {
    try {
      const resp = await fetch("http://localhost:3001/reviews/" + gameId, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      setContent("")
      setDeleted(true)
      setSuccess(false)
      fetchAllReviews()
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    setRating(userRating)
    fetchReview()
  }, [])

  return <div className="mt-3 w-100">
    <Form onSubmit={ev => handleSubmit(ev)}>
      <p className="h2 mb-2">Your Rating</p>
      <div role="button">
        <StarFill className="star fs-3"
          onMouseEnter={() => setHover(1)}
          onMouseLeave={() => setHover(0)}
          color={hover >= 1 || rating >= 1 ? "#1ad214" : "#fef9f6"}
          onClick={() => handleRating(1)}
        />
        <StarFill className="star fs-3"
          onMouseEnter={() => setHover(2)}
          onMouseLeave={() => setHover(0)}
          color={hover >= 2 || rating >= 2 ? "#1ad214" : "#fef9f6"}
          onClick={() => handleRating(2)}
        />
        <StarFill className="star fs-3"
          onMouseEnter={() => setHover(3)}
          onMouseLeave={() => setHover(0)}
          color={hover >= 3 || rating >= 3 ? "#1ad214" : "#fef9f6"}
          onClick={() => handleRating(3)}
        />
        <StarFill className="star fs-3"
          onMouseEnter={() => setHover(4)}
          onMouseLeave={() => setHover(0)}
          color={hover >= 4 || rating >= 4 ? "#1ad214" : "#fef9f6"}
          onClick={() => handleRating(4)}
        />
        <StarFill className="star fs-3 primary"
          onMouseEnter={() => setHover(5)}
          onMouseLeave={() => setHover(0)}
          color={hover === 5 || rating === 5 ? "#1ad214" : "#fef9f6"}
          onClick={() => handleRating(5)}
        />
      </div>
      <div>
        <p className="h5 mt-3">Leave a Review</p>
        {hasError && <Alert variant="danger">{errorMessage}</Alert>}
        {success && <Alert>Review posted</Alert>}
        {deleted && <Alert>Review deleted</Alert>}
        <FloatingLabel controlId="floatingTextarea2" label="Review">
          <Form.Control
            as="textarea"
            placeholder="Leave a review here"
            style={{ height: '100px' }}
            onChange={ev => setContent(ev.target.value)}
            value={content}
            maxLength={300}
            required
          />
        </FloatingLabel>
        <div className="d-flex gap-2 align-items-center mt-3">
          <Button type="submit" className="rounded rounded-pill" >
            {alresdyReviewed ? "Edit Review" : "Submit"}
          </Button>
          {alresdyReviewed &&
            <Button variant="danger" onClick={deleteReview} className="rounded rounded-pill">
              <Trash />
            </Button>
          }
        </div>
      </div>
    </Form>
  </div>
}

export default RatingComponent
