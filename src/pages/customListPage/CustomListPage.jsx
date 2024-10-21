import "./CustomListPage.scss"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Footer from "../../components/footer/Footer"
import NavBar from "../../components/navBar/NavBar"
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import LoadingGameCard from "../../components/gameCard/LoadingGameCard"
import GameCard from "../../components/gameCard/GameCard"
import { Check } from "react-bootstrap-icons"

const CustomListPage = () => {
    const params = useParams()

    const [games, setGames] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(params.listTitle)

    const token = localStorage.getItem("token")
    const navigate = useNavigate()

    const fetchGames = async () => {
        try {
            const resp = await fetch(`http://localhost:3001/customLists/games/${params.listId}`, {
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

    const handleSubmit = ev => {
        ev.preventDefault()
        editTitle()
    }

    const editTitle = async () => {
        try {
            const resp = await fetch("http://localhost:3001/customLists/" + params.listId, {
                method: "PUT",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            })
            const data = await resp.json()
            if (resp.ok) {
                setEditMode(false)
                window.history.replaceState(null, null, `/customList/${title}/${params.listId}`)
            } else throw new Error(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return <>
        <NavBar />
        <Container>
            {editMode ?
                <Form className="w-50 mb-3" onSubmit={ev => handleSubmit(ev)}>
                    <InputGroup className="editCustomListTitle ">
                        <Form.Control
                            value={title}
                            onChange={ev => setTitle(ev.target.value)}
                            aria-label="Title"
                            aria-describedby="basic-addon1"
                            required
                        />
                        <Button
                            className="btn btn-primary"
                            id="basic-addon1"
                            type="submit"
                        >
                            <Check />
                        </Button>
                    </InputGroup>
                </Form> :
                <p
                    onClick={() => setEditMode(true)}
                    role="button"
                    className="h1 customListTitle d-inline-block"
                >
                    {title}
                </p>
            }
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

export default CustomListPage
