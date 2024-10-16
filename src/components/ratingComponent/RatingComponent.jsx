import { useEffect, useState } from "react"
import "./RatingComponent.scss"
import { StarFill } from "react-bootstrap-icons"

const RatingComponent = ({ ratingSetter, gameId, userRating, list }) => {
  const [hover, setHover] = useState(0)
  const [rating, setRating] = useState(userRating)

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
      console.log(data)
      if (!resp.ok) throw new Error(data.message)
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleRating = rat => {
    console.log(list)
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

  useEffect(() => {
    setRating(userRating)
  }, [])

  return <div className="mt-3">
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
  </div>
}

export default RatingComponent
