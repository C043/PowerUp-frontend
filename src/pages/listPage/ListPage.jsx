import Footer from "../../components/footer/Footer.jsx"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import LoadingGameCard from "../../components/gameCard/LoadingGameCard"
import GameCard from "../../components/gameCard/GameCard"
import NavBar from "../../components/navBar/NavBar"

const ListPage = ({ listType }) => {
    const [games, setGames] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    const token = localStorage.getItem("token")

    const fetchGames = async () => {
        try {
            const resp = await fetch(`http://localhost:3001/lists/${listType}`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            const data = await resp.json()
            if (resp.ok) {
                if (data.length > 0) data.forEach(game => fetchSingleGame(game.gameId))
                else setIsLoaded(true)
            } else throw new Error(data.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const fetchSingleGame = async (gameId) => {
        try {
            const resp = await fetch("http://localhost:3001/games/" + gameId, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            if (resp.ok) {
                const data = await resp.json()
                setGames(games => [...games, data])
            } else throw new Error(resp.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return <>
        <NavBar />
        <Container>
            <h1>{listType[0].toUpperCase().concat(listType.slice(1))}</h1>
            {games.length === 0 && isLoaded === true &&
                <>
                    <p className="h5">Sorry, no games here 😰</p>
                    <p className="h5">Add some first</p>
                </>
            }
            <Row className="w-100 mt-3 g-2">
                {games.length === 0 && isLoaded === false &&
                    [...Array(20).keys()].map(index =>
                        <Col xs="12" md="6" lg="3" key={index}>
                            <LoadingGameCard />
                        </Col>
                    )
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
        </Container>
        <Footer />
    </>
}

export default ListPage
