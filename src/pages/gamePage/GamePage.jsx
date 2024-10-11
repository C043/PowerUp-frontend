import "./GamePage.scss"
import { Container, Button } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import GameCover from "../../components/gameCover/GameCover"
import Footer from "../../components/footer/Footer"

const GamePage = () => {
	const params = useParams()
	const token = localStorage.getItem("token")
	const [game, setGame] = useState()
	const [backlog, setBacklog] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [played, setPlayed] = useState(false)

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
				fetchLists("backlog")
				fetchLists("playing")
				fetchLists("played")
			} else throw new Error("Fetch Error")
		} catch (error) {
			console.log(error.message)
		}
	}

	const addToList = async (list) => {
		try {
			const resp = await fetch(`http://localhost:3001/lists/${list}`, {
				method: "POST",
				body: JSON.stringify({
					gameId: game.id
				}),
				headers: {
					"Authorization": `Bearer ${token}`,
					"Content-type": "application/json"
				}
			})
			if (resp.ok) {
				fetchLists("backlog")
				fetchLists("playing")
				fetchLists("played")
			} else throw new Error(resp.message)
		} catch (error) {
			console.log(error.message)
		}
	}

	const fetchLists = async (list) => {
		try {
			const resp = await fetch(`http://localhost:3001/lists/${list}`, {
				headers: {
					"Authorization": "Bearer " + token
				},
			})
			if (resp.ok) {
				const data = await resp.json()
				const isPresent = data.filter(listItem =>
					listItem.gameId === parseInt(params.gameId)
				)
				if (isPresent.length > 0) {
					switch (list) {
						case "backlog": {
							setBacklog(true)
							setPlayed(false)
							setPlaying(false)
							break
						}
						case "playing": {
							setPlaying(true)
							setBacklog(false)
							setPlayed(false)
							break
						}
						case "played": {
							setPlayed(true)
							setBacklog(false)
							setPlaying(false)
							break
						}
					}
				}
			} else throw new Error(resp.message)
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
					<div
						className="d-flex flex-column flex-md-row align-items-center 
						align-items-md-start gap-4 mt-5"
					>
						<img src={game.background_image} className="gameImage" />
						<div className="d-flex flex-column ">
							<h1>{game.name}</h1>
							<div className="buttons position-sticky d-flex gap-3">
								<Button
									className="rounded rounded-pill" variant="info"
									onClick={() => addToList("backlog")}
									disabled={
										backlog
									}
								>
									Backlog
								</Button>
								<Button
									className="rounded rounded-pill" variant="danger"
									onClick={() => addToList("playing")}
									disabled={
										playing
									}
								>
									Playing
								</Button>
								<Button
									className="rounded rounded-pill"
									onClick={() => addToList("played")}
									disabled={
										played
									}
								>
									Played
								</Button>
							</div>
						</div>
					</div>
					<h2 className="mt-3">Description</h2>
					<div dangerouslySetInnerHTML={{ __html: game.description }} />
				</>
			}
		</Container>
		<Footer />
	</>
}

export default GamePage