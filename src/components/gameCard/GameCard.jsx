import { Button, Card } from "react-bootstrap";
import "./GameCard.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Dash } from "react-bootstrap-icons";
import { useState } from "react";
import GameCardHoverComponent from "../gameCardHoverComponent/GameCardHoverComponent";

const GameCard = ({ image, title, gameId, customGame }) => {
  const [hide, setHide] = useState(false)

  const navigate = useNavigate()
  const params = useParams()

  const token = localStorage.getItem("token")

  const url = import.meta.env.VITE_URL

  const removeFromList = async () => {
    try {
      const resp = await fetch(`${url}/customLists/${params.listId}/${gameId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setHide(true)
    }
  }

  return (
    <Card border="dark" className={hide ? "d-none" : "border-opacity-0"}>
      {customGame && <>
        <div
          className="deleteGame position-absolute bg-danger rounded rounded-circle p-0"
          role="button"
          onClick={removeFromList}
        >
          <Dash />
        </div>
      </>
      }
      <GameCardHoverComponent gameId={gameId} />
      <Card.Img variant="top" src={image} className="object-fit-cover" style={{
        height: "150px",
      }} />
      <Card.Body
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
        className="imageBg p-0"
      >
        <div className="blur py-3 px-3 rounded-bottom ">
          <Card.Title className="truncate">{title}</Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-end">
              <Button onClick={() => navigate(`/game/${gameId}`)} variant="dark"
                className="rounded rounded-pill ">
                Open
              </Button>
            </div>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GameCard;
