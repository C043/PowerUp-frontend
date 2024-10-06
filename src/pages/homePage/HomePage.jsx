import { useEffect, useState } from "react";
import GameCard from "../../components/gameCard/GameCard";
import NavBar from "../../components/navBar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const token = useSelector(state => state.token);

  const fetchGames = async () => {
    try {
      const resp = await fetch("http://localhost:3001/games", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setGames(data.results);
      } else throw new Error("Fetch error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);
  return (
    <>
      <NavBar />
      <Container>
        <h1>Home</h1>
        <div className="d-flex">
          <Row>
            <Col xs="12">
              <SideBar />
            </Col>
          </Row>
          <Row className="mt-3 row-cols-2 row-cols-lg-5 g-2 g-lg-3">
            {games.map(game => (
              <Col key={game.id}>
                <GameCard key={game.id} image={game.background_image} title={game.name} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
