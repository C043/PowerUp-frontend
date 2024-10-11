import "./GamePage.scss"
import { Container } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import GameCover from "../../components/gameCover/GameCover"

const GamePage = () => {
	const params = useParams()
	const token = localStorage.getItem("token")
	const [game, setGame] = useState()

	const fetchGame = async () => {
		try {
			const resp = await fetch(`http://localhost:3001/games/${params.gameId}`, {
				headers: {
					"Authorization": "Bearer " + token
				}
			})
			if (resp.ok) {
				const data = await resp.json()
				setGame(data)
			} else throw new Error("Fetch Error")
		} catch (error) {
			console.log(error.message)
		}
	}

	useEffect(() => {
		fetchGame()
	}, [])

	return <>
		<NavBar />
		<Container>
			{game &&
				<>
					<GameCover cover={game.background_image_additional} />
					<div dangerouslySetInnerHTML={{ __html: game.description }} />
				</>
			}
		</Container>
	</>
}

export default GamePage
