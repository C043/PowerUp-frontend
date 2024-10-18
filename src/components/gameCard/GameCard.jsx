import { Button, Card } from "react-bootstrap";
import "./GameCard.scss";
import { useNavigate } from "react-router-dom";

const GameCard = ({ image, title, gameId }) => {
  const navigate = useNavigate()

  return (
    <Card border="dark" className="border-opacity-0">
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
