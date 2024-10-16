import "./RatingComponent.scss"
import { Star } from "react-bootstrap-icons"

const RatingComponent = ({ gameId }) => {
  return <div className="mt-3">
    <p className="h2 mb-2">Your Rating</p>
    <div role="button">
      <Star className="star fs-3" />
      <Star className="star fs-3" />
      <Star className="star fs-3" />
      <Star className="star fs-3" />
      <Star className="star fs-3" />
    </div>
  </div>
}

export default RatingComponent
