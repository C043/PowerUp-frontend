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
  const [platform, setPlatform] = useState(false)
  const [search, setSearch] = useState("")

  const token = localStorage.getItem("token")

  const navigate = useNavigate()

  let url = "http://localhost:3001/games?"
  if (platform) url = url + "&platforms=" + platform
  if (search) url = url + "&search=" + search

  const fetchGames = async () => {
    try {
      const resp = await fetch(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (resp.ok) {
        const data = await resp.json();
        setGames(data.results)
      } else throw new Error("Fetch error");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchGames();
    if (!token) navigate("/")
  }, [platform, search]);

  return (
    <>
      <NavBar search={search} onSearch={search => setSearch(search)} />
      <Container>
        <h1>Home</h1>
        <div className="d-flex">
          <Row>
            <Col xs="12">
              <SideBar platform={platform} onFilter={(platformId) => {
                if (platform === platformId) {
                  setPlatform(false)
                } else {
                  setPlatform(platformId)
                }
              }}
              />
            </Col>
          </Row>
          <Row className="mt-3 g-2 g-lg-3">
            {games.map(game => (
              <Col xs="12" md="6" lg="3" key={game.id}>
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
