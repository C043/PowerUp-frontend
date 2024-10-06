import { Button, Card } from "react-bootstrap";
import "./GameCard.scss";

const GameCard = ({ image, title }) => {
  return (
    <Card border="dark" className="border-opacity-0">
      <Card.Img variant="top" src={image} />
      <Card.Body
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
        className="imageBg p-0"
      >
        <div className="blur py-3 px-3 rounded-bottom w-100">
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <div className="d-flex justify-content-end">
              <Button variant="dark" className="rounded rounded-pill ">
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
