import { useEffect, useState } from "react";
import GameCard from "../../components/gameCard/GameCard";
import NavBar from "../../components/navBar/NavBar";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1)
  const token = useSelector(state => state.token);

  const navigate = useNavigate()

  const fetchGames = async () => {
    try {
      const resp = await fetch("http://localhost:3001/games?page=" + page, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        if (page === 1) setGames(data.results)
        else data.results.forEach(game => games.push(game))
      } else throw new Error("Fetch error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight
    if (bottom) {
      setPage(() => page + 1)
    }
  }

  window.addEventListener("scroll", handleScroll)

  useEffect(() => {
    fetchGames();
    if (!token) navigate("/")
  }, [page]);

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
