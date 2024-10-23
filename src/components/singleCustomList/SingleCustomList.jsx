import "./SingleCustomList.scss"
import { useNavigate } from "react-router-dom"

const SingleCustomList = ({ title, listId }) => {
  const navigate = useNavigate()

  return <div
    className="singleCustomList d-flex flex-column justify-content-center rounded align-items-center"
    onClick={() => navigate(`/customList/${title}/${listId}`)}
    role="button"
  >
    <p className="truncate my-3 h3">{title}</p>
  </div>
}

export default SingleCustomList
