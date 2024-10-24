import "./SingleCustomList.scss"
import { useNavigate } from "react-router-dom"

const SingleCustomList = ({ title, listId }) => {
  const navigate = useNavigate()

  return <div
    className="singleCustomList d-flex flex-column align-items-center rounded"
    onClick={() => navigate(`/customList/${title}/${listId}`)}
    role="button"
  >
    <div className="blur w-100 h-100 d-flex justify-content-center rounded">
      <p className="truncate my-3 h3">{title}</p>
    </div>
  </div>
}

export default SingleCustomList
