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
  const [platform, setPlatform] = useState(false)

  const token = useSelector(state => state.token);

  const navigate = useNavigate()

  let url = "http://localhost:3001/games?page=" + page
  if (platform) url = url + "&platforms=" + platform

  const fetchGames = async () => {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        if (page === 1 || page === 1 && platform) setGames(data.results)
        else data.results.forEach(game => games.push(game))
      } else throw new Error("Fetch error");
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (e) => {
    const bottom = e.target.scrollingElement.scrollHeight - e.target.scrollingElement.scrollTop === e.target.scrollingElement.clientHeight
    if (bottom && platform === false) {
      setPage(() => page + 1)
    }
  }

  window.addEventListener("scroll", handleScroll)

  useEffect(() => {
    fetchGames();
    if (!token) navigate("/")
  }, [page, platform]);

  return (
    <>
      <NavBar />
      <Container>
        <h1>Home</h1>
        <div className="d-flex">
          <Row>
            <Col xs="12">
              <SideBar onFilter={(platformId) => {
                if (platform === platformId) setPlatform(false)
                else setPlatform(platformId)
                setPage(1)
                window.scrollTo(0, 0)
              }}
              />
            </Col>
          </Row>
          <Row className="mt-3 row-cols-1 row-cols-md-2 row-cols-lg-4 g-2 g-lg-3">
            {games.map(game => (
              <Col key={game.id}>
                <GameCard image={game.background_image} title={game.name} />
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
