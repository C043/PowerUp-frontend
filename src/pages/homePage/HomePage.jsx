import "./HomePage.scss"
import { useEffect, useState } from "react";
import GameCard from "../../components/gameCard/GameCard";
import NavBar from "../../components/navBar/NavBar";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import SideBar from "../../components/sideBar/SideBar";
import Footer from "../../components/footer/Footer";
import LoadingGameCard from "../../components/gameCard/LoadingGameCard";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [platform, setPlatform] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const [hasPrevious, setHasPrevious] = useState(false)

  const page = useSelector(store => store.page)

  const search = useSelector(state => state.search)

  const token = localStorage.getItem("token")

  const dispatch = useDispatch()

  let url = import.meta.env.VITE_URL + "/games?page=" + page
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
        if (data.next !== null) setHasNext(true)
        else setHasNext(false)
        if (data.previous != null) setHasPrevious(true)
        else setHasPrevious(false)
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
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [platform, search, page]);

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
          <div className="d-flex flex-column align-items-center gap-3">
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
                    platforms={game.parent_platforms}
                  />
                </Col>
              ))}
            </Row>
            <div className="d-flex gap-3">
              {hasPrevious &&
                <Button
                  onClick={() => {
                    dispatch({ type: "PAGE", payload: page - 1 })
                  }
                  }
                  className="navBtn rounded rounded-circle"
                >
                  <ArrowLeft />
                </Button>
              }
              {hasNext &&
                <Button
                  onClick={() => dispatch({ type: "PAGE", payload: page + 1 })}
                  className="navBtn rounded rounded-circle"
                >
                  <ArrowRight />
                </Button>
              }
            </div>

          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
