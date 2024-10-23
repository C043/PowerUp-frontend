import { useEffect, useState } from "react";
import GameCard from "../../components/gameCard/GameCard";
import NavBar from "../../components/navBar/NavBar";
import { Alert, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import LoadingGameCard from "../../components/gameCard/LoadingGameCard";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const search = useSelector(state => state.search)

  const token = localStorage.getItem("token")


  let url = import.meta.env.VITE_URL + "/games?"
  if (platform) url = url + "&platforms=" + platform
  if (search) url = url + "&search=" + search

  const fetchGames = async () => {
    setHasError(false)
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
      setHasError(true)
      console.log(error);
    } finally {
      setIsLoaded(true)
    }
  };

  useEffect(() => {
    fetchGames();
  }, [platform, search]);

  return (
    <>
      <NavBar />
      <Container>
        <h1>{search ? "Search" : "Home"}</h1>
        <div className="d-flex flex-column flex-md-row">
          <div className="d-none d-md-block">
            <SideBar platform={platform} onFilter={(platformId) => {
              if (platform === platformId) {
                setPlatform(false)
              } else {
                setPlatform(platformId)
              }
            }}
            />
          </div>
          <div className="d-block d-md-none">
            <SideBar platform={platform} onFilter={(platformId) => {
              if (platform === platformId) {
                setPlatform(false)
              } else {
                setPlatform(platformId)
              }
            }}
            />
          </div>
          <Row className="w-100 mt-3 g-2">
            {hasError && isLoaded && <Alert variant="danger">Fetch Error</Alert>}
            {games.length === 0 && isLoaded === false &&
              [...Array(20).keys()].map(index =>
                <Col xs="12" md="6" lg="3" key={index}>
                  <LoadingGameCard />
                </Col>
              )
            }
            {games.length === 0 && isLoaded === true && <p className="h5">Sorry,
              no games here 😰</p>
            }
            {games.map(game => (
              <Col xs="12" md="6" lg="3" key={game.id}>
                <GameCard
                  image={game.background_image ?
                    game.background_image :
                    "https://ui-avatars.com/api/?background=random&name=" + game.name}
                  title={game.name}
                  gameId={game.id}
                />
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
