import { useEffect } from "react"
import { StarFill } from "react-bootstrap-icons"

const SingleReviewComponent = ({ content, rating, user }) => {
  return <div className="d-flex gap-2 my-3">
    <img
      src={user.avatar}
      className="border-0 rounded rounded-circle propic border border-color-primary "
      alt="profile-pic"
    />
    <div className="d-flex flex-column">
      <p className="h5 mb-1">{user.username}</p>
      <div className="d-flex">
        <StarFill className="fs-4" color={rating > 0 ? "#1ad214" : "#fef9f6"} />
        <StarFill className="fs-4" color={rating > 1 ? "#1ad214" : "#fef9f6"} />
        <StarFill className="fs-4" color={rating > 2 ? "#1ad214" : "#fef9f6"} />
        <StarFill className="fs-4" color={rating > 3 ? "#1ad214" : "#fef9f6"} />
        <StarFill className="fs-4" color={rating > 4 ? "#1ad214" : "#fef9f6"} />
      </div>
      <p className="mt-2">{content}</p>
    </div>
  </div>
}

export default SingleReviewComponent
