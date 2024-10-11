import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import LoadingGameCard from "../../components/gameCard/LoadingGameCard"
import GameCard from "../../components/gameCard/GameCard"
import NavBar from "../../components/navBar/NavBar"

const ListPage = ({ listType }) => {
    const [games, setGames] = useState([])
    const token = localStorage.getItem("token")

    const fetchGames = async () => {
        try {
            const resp = await fetch(`http://localhost:3001/lists/${listType}`, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            if (resp.ok) {
                const data = await resp.json()
                data.forEach(game => fetchSingleGame(game.gameId))
            } else throw new Error(resp.message)
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
                setGames([...games, data])
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
            <h1>{listType}</h1>
            <Row className="w-100 mt-3 g-2">
                {games.length === 0 &&
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
    </>
}

export default ListPage
