import { useNavigate } from "react-router-dom"

const SingleCustomList = ({ title, listId }) => {
  const navigate = useNavigate()

  return <div
    className="d-flex flex-column justify-content-center bg-secondary rounded align-items-center"
    onClick={() => navigate(`/customList/${listId}`)}
    role="button"
  >
    <p className="my-3">{title}</p>
  </div>
}

export default SingleCustomList
