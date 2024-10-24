
import { Button, Card, Placeholder } from "react-bootstrap";

const LoadingGameCard = ({ image, title }) => {
  return (
    <Card border="dark" className="border-opacity-0" style={{
      height: "300px"
    }}>
      <Card.Body
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
        }}
        className="imageBg p-0 d-flex flex-column justify-content-end"
      >
        <div className=" py-3 px-3 rounded-bottom w-100">
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
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

export default LoadingGameCard;
