import { useEffect, useState } from "react"
import "./RatingComponent.scss"
import { StarFill } from "react-bootstrap-icons"
import { Alert, Button, FloatingLabel, Form } from "react-bootstrap"

const RatingComponent = ({ ratingSetter, gameId, userRating, list }) => {
  const [hover, setHover] = useState(0)
  const [rating, setRating] = useState(userRating)
  const [content, setContent] = useState("")
  const [hasError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const token = localStorage.getItem("token")

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
    try {
      const resp = await fetch("http://localhost:3001/reviews", {
        method: "POST",
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
        alert("Fatto")
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

  useEffect(() => {
    setRating(userRating)
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
        <FloatingLabel controlId="floatingTextarea2" label="Review">
          <Form.Control
            as="textarea"
            placeholder="Leave a review here"
            style={{ height: '100px' }}
            required
          />
        </FloatingLabel>
        <Button type="submit" className="mt-3">Submit</Button>
      </div>
    </Form>
  </div>
}

export default RatingComponent
