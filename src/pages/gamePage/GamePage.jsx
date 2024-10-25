import "./GamePage.scss"
import { Container, Button, Form, Modal, Alert } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import GameCover from "../../components/gameCover/GameCover"
import Footer from "../../components/footer/Footer"
import GameNotesComponent from "../gameNotes/GameNotesComponent"
import RatingComponent from "../../components/ratingComponent/RatingComponent"
import ReviewsComponent from "../../components/reviewsComponent/ReviewsComponent"
import AddToCustomListComponent from "../../components/addToCustomListComponent/AddToCustomListComponent"
import ScreenshotsComponent from "../../components/screenshotsComponent/ScreenshotsComponent"

const GamePage = () => {
	const params = useParams()
	const token = localStorage.getItem("token")
	const [game, setGame] = useState()
	const [backlog, setBacklog] = useState(false)
	const [playing, setPlaying] = useState(false)
	const [played, setPlayed] = useState(false)
	const [rating, setRating] = useState(0)
	const [list, setList] = useState("")
	const [hasError, setHasError] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)
	const [pc, setPc] = useState(false)
	const [playstation, setPlaystation] = useState(false)
	const [xbox, setXbox] = useState(false)
	const [switchPlatform, setSwitch] = useState(false)
	const [ios, setIos] = useState(false)
	const [android, setAndroid] = useState(false)
	const [mac, setMac] = useState(false)

	const url = import.meta.env.VITE_URL

	const fetchGame = async () => {
		setHasError(false)
		setIsLoaded(false)
		try {
			const resp = await fetch(`${url}/games/${params.gameId}`, {
				headers: {
					"Authorization": "Bearer " + token
				}
			})
			if (resp.ok) {
				const data = await resp.json()
				setGame(data)
				console.log(data)
				data.parent_platforms.forEach(platform => {
					const id = platform.platform.id
					switch (id) {
						case 7:
							setSwitch(true)
							break
						case 4:
							setIos(true)
							break
						case 8:
							setAndroid(true)
							break
						case 2:
							setPlaystation(true)
							break
						case 5:
							setMac(true)
							break
						case 3:
							setXbox(true)
							break
						case 1:
							setPc(true)
							break
					}
				})
				fetchLists("backlog")
				fetchLists("playing")
				fetchLists("played")
			} else throw new Error("Fetch Error")
		} catch (error) {
			setHasError(true)
			console.log(error.message)
		} finally {
			setIsLoaded(true)
		}
	}

	const addToList = async (list) => {
		try {
			const resp = await fetch(`${url}/lists/${list}`, {
				method: "POST",
				body: JSON.stringify({
					gameId: game.id,
					userRating: rating
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

	const removeFromList = async list => {
		try {
			const resp = await fetch(`${url}/lists/${list}/${game.id}`, {
				method: "DELETE",
				headers: {
					"Authorization": "Bearer " + token,
				}
			})
			if (resp.ok) {
				fetchLists("backlog")
				fetchLists("playing")
				fetchLists("played")
			}
		} catch (error) {
			console.log(error.message)
		}
	}

	const fetchLists = async (list) => {
		try {
			const resp = await fetch(`${url}/lists/${list}`, {
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
							setRating(isPresent[0].userRating)
							setList("backlog")
							break
						}
						case "playing": {
							setPlaying(true)
							setBacklog(false)
							setPlayed(false)
							setRating(isPresent[0].userRating)
							setList("playing")
							break
						}
						case "played": {
							setPlayed(true)
							setBacklog(false)
							setPlaying(false)
							setRating(isPresent[0].userRating)
							setList("played")
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
			{hasError && isLoaded && <Alert variant="danger">Fetch Error</Alert>}
			{game &&
				<>
					<GameCover cover={game.background_image_additional} />
					<div
						className="d-flex flex-column flex-md-row align-items-center 
						align-items-md-start gap-4 mt-5"
					>
						<div className="d-flex flex-column">
							<img src={game.background_image} className="gameImage" />
							<p className="h3 mt-3">Platforms</p>
							<div className="d-none d-md-block">
								<div className="d-flex gap-1 align-items-center mb-3">
									{pc &&
										<svg className="platformIcon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0
            2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z" >
											</path>
										</svg>
									}
									{xbox &&
										<svg className="platformIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435
            6.396 0 8 0c1.502 0 2.908.415 4.11
            1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993
            2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305
            1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342
            2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426
            5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98
            8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0
            00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043
            3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425
            3.801-5.29 0
            0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391
            1.391 0 00-.878.431A8 8 0 0013.92
            13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z">
											</path>
										</svg>
									}
									{playstation &&
										<svg className="platformIcon" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52
            4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112
            16zM12 14.32V16s7.666-2.338
            8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0
            0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12
            14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024
            10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934
            11.934 0 007 12.046l-.024 1.5z" >
											</path>
										</svg>
									}
									{switchPlatform &&
										<svg className="platformIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 16">
											<path fillRule="evenodd" d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135
            1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0
            000-12.13h-5.12zm-1.33 2.304h2.401l3.199
            5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z">
											</path>
										</svg>
									}
									{ios &&
										<svg className="platformIcon" className="mobileIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 18">
											<path d="M9.538 0H1.651C.896 0 .287.587.287 1.31v15.368c0 .723.61 1.31
            1.364 1.31h7.887c.754 0 1.364-.587
            1.364-1.31V1.31c0-.723-.61-1.31-1.364-1.31zm-5.89.796h3.894c.098 0
            .178.14.178.315 0 .174-.08.316-.178.316H3.648c-.099
            0-.177-.142-.177-.316 0-.174.078-.315.177-.315zm1.947 15.898c-.48
            0-.87-.375-.87-.836 0-.462.39-.835.87-.835s.87.373.87.835c0
            .461-.39.836-.87.836zM9.88 13.83H1.31V2.21h8.57v11.62z">
											</path>
										</svg>
									}
									{android &&
										<svg className="mobileIcon" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.168 5.86H1.12c-.614 0-1.115.482-1.115 1.07v4.665c0 .59.5
            1.071 1.115 1.071h.049c.614 0 1.115-.482
            1.115-1.071V6.93c0-.589-.502-1.072-1.116-1.072zm1.65 7.535c0
            .541.46.983 1.025.983h1.095v2.519c0 .591.503 1.073 1.116
            1.073h.048c.615 0 1.116-.482 1.116-1.073v-2.52H8.75v2.52c0 .591.504
            1.073 1.117 1.073h.047c.615 0 1.116-.482
            1.116-1.073v-2.52h1.096c.564 0 1.025-.44
            1.025-.982V6.03H2.818v7.364zm7.739-11.83l.87-1.29a.173.173 0
            00-.054-.246.188.188 0 00-.256.052l-.902 1.335A6.092 6.092 0 007.985
            1a6.1 6.1 0 00-2.232.416L4.853.08a.19.19 0 00-.257-.05.173.173 0
            00-.055.246l.871 1.29c-1.57.739-2.628 2.131-2.628 3.729 0
            .098.006.195.015.29H13.17c.009-.095.014-.192.014-.29
            0-1.598-1.059-2.99-2.628-3.73zM5.58 3.875a.489.489 0
            01-.5-.48c0-.265.224-.478.5-.478.277 0 .5.213.5.478a.489.489 0
            01-.5.48zm4.809 0a.489.489 0
            01-.5-.48c0-.265.224-.478.5-.478s.498.213.498.478a.488.488 0
            01-.498.48zm4.458 1.985h-.046c-.614 0-1.117.482-1.117 1.07v4.665c0
            .59.503 1.071 1.117 1.071h.047c.615 0 1.115-.482
            1.115-1.071V6.93c0-.589-.501-1.072-1.116-1.072z" >
											</path>
										</svg>
									}
								</div>
								<ReviewsComponent gameId={params.gameId} />
							</div>
						</div>
						<div className="d-flex flex-column align-items-start">
							<h1>{game.name}</h1>
							<div className="buttons d-flex gap-3">
								<div role="button" onClick={() => {
									if (!backlog) {
										addToList("backlog")
										setBacklog(true)
										setPlaying(false)
										setPlayed(false)
									}
									else {
										removeFromList("backlog")
										setList("")
										setBacklog(false)
									}
								}}>
									<Button
										className="rounded rounded-pill" variant="secondary"
									>
										<div className="d-flex gap-1">
											<Form.Check
												type={"radio"}
												checked={backlog}
												readOnly
											/>
											Backlog
										</div>
									</Button>
								</div>
								<div role="button" onClick={() => {
									if (!playing) {
										setPlaying(true)
										addToList("playing")
										setBacklog(false)
										setPlayed(false)
									}
									else {
										setPlaying(false)
										removeFromList("playing")
										setList("")
									}
								}
								}>
									<Button
										className="rounded rounded-pill" variant="danger"
									>
										<div className="d-flex gap-1">
											<Form.Check
												type={"radio"}
												checked={playing}
												readOnly
											/>
											Playing
										</div>
									</Button>
								</div>
								<div role="button" onClick={() => {
									if (!played) {
										setPlayed(true)
										addToList("played")
										setBacklog(false)
										setPlaying(false)
									}
									else {
										removeFromList("played")
										setList("")
										setPlayed(false)
									}
								}
								}
								>
									<Button
										className="rounded rounded-pill"
									>
										<div className="d-flex gap-1">
											<Form.Check
												type={"radio"}
												checked={played}
												readOnly
											/>
											Played
										</div>
									</Button>
								</div>
							</div>
							<AddToCustomListComponent />
							{list && <RatingComponent
								list={list}
								ratingSetter={(rat) => setRating(rat)}
								userRating={rating} gameId={params.gameId}
							/>}
							<p className="mt-3 h2">Screenshots</p>
							<ScreenshotsComponent screenshots={game.short_screenshots} />
							<h2 className="mt-3">Description</h2>
							<div dangerouslySetInnerHTML={{ __html: game.description }} />
							<GameNotesComponent gameId={params.gameId} />
							<div className="d-block d-md-none">
								<p className="h3 mt-3">Platforms</p>
								<div className="d-flex gap-1 align-items-center mb-3">
									{pc &&
										<svg className="platformIcon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M0 13.772l6.545.902V8.426H0zM0 7.62h6.545V1.296L0
            2.198zm7.265 7.15l8.704 1.2V8.425H7.265zm0-13.57v6.42h8.704V0z" >
											</path>
										</svg>
									}
									{xbox &&
										<svg className="platforIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
											<path d="M3.564 1.357l-.022.02c.046-.048.11-.1.154-.128C4.948.435
            6.396 0 8 0c1.502 0 2.908.415 4.11
            1.136.086.052.324.215.446.363C11.4.222 7.993 2.962 7.993
            2.962c-1.177-.908-2.26-1.526-3.067-1.746-.674-.185-1.14-.03-1.362.141zm10.305
            1.208c-.035-.04-.074-.076-.109-.116-.293-.322-.653-.4-.978-.378-.295.092-1.66.584-3.342
            2.172 0 0 1.894 1.841 3.053 3.723 1.159 1.883 1.852 3.362 1.426
            5.415A7.969 7.969 0 0016 7.999a7.968 7.968 0 00-2.13-5.434zM10.98
            8.77a55.416 55.416 0 00-2.287-2.405 52.84 52.84 0
            00-.7-.686l-.848.854c-.614.62-1.411 1.43-1.853 1.902-.787.84-3.043
            3.479-3.17 4.958 0 0-.502-1.174.6-3.88.72-1.769 2.893-4.425
            3.801-5.29 0
            0-.83-.913-1.87-1.544l-.007-.002s-.011-.009-.03-.02c-.5-.3-1.047-.53-1.573-.56a1.391
            1.391 0 00-.878.431A8 8 0 0013.92
            13.381c0-.002-.169-1.056-1.245-2.57-.253-.354-1.178-1.46-1.696-2.04z">
											</path>
										</svg>
									}
									{playstation &&
										<svg className="platformIcon" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
											<path d="M11.112 16L8 14.654V0s6.764 1.147 7.695 3.987c.931 2.842-.52
            4.682-1.03 4.736-1.42.15-1.96-.748-1.96-.748V3.39l-1.544-.648L11.112
            16zM12 14.32V16s7.666-2.338
            8.794-3.24c1.128-.9-2.641-3.142-4.666-2.704 0
            0-2.152.099-4.102.901-.019.008 0 1.51 0 1.51l4.948-1.095 1.743.73L12
            14.32zm-5.024-.773s-.942.476-3.041.452c-2.1-.024-3.959-.595-3.935-1.833C.024
            10.928 3.476 9.571 6.952 9v1.738l-3.693.952s-.632.786.217.81A11.934
            11.934 0 007 12.046l-.024 1.5z" >
											</path>
										</svg>
									}
									{switchPlatform &&
										<svg className="platformIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 16">
											<path fillRule="evenodd" d="M8 0h5a8 8 0 110 16H8A8 8 0 118 0zm-.135
            1.935a6.065 6.065 0 000 12.13h5.12a6.065 6.065 0
            000-12.13h-5.12zm-1.33 2.304h2.401l3.199
            5.175V4.24h2.346v7.495H12.18L8.864 6.537v5.201H6.53l.005-7.499z">
											</path>
										</svg>
									}
									{ios &&
										<svg className="mobileIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11 18">
											<path d="M9.538 0H1.651C.896 0 .287.587.287 1.31v15.368c0 .723.61 1.31
            1.364 1.31h7.887c.754 0 1.364-.587
            1.364-1.31V1.31c0-.723-.61-1.31-1.364-1.31zm-5.89.796h3.894c.098 0
            .178.14.178.315 0 .174-.08.316-.178.316H3.648c-.099
            0-.177-.142-.177-.316 0-.174.078-.315.177-.315zm1.947 15.898c-.48
            0-.87-.375-.87-.836 0-.462.39-.835.87-.835s.87.373.87.835c0
            .461-.39.836-.87.836zM9.88 13.83H1.31V2.21h8.57v11.62z">
											</path>
										</svg>
									}
									{android &&
										<svg className="mobileIcon" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M1.168 5.86H1.12c-.614 0-1.115.482-1.115 1.07v4.665c0 .59.5
            1.071 1.115 1.071h.049c.614 0 1.115-.482
            1.115-1.071V6.93c0-.589-.502-1.072-1.116-1.072zm1.65 7.535c0
            .541.46.983 1.025.983h1.095v2.519c0 .591.503 1.073 1.116
            1.073h.048c.615 0 1.116-.482 1.116-1.073v-2.52H8.75v2.52c0 .591.504
            1.073 1.117 1.073h.047c.615 0 1.116-.482
            1.116-1.073v-2.52h1.096c.564 0 1.025-.44
            1.025-.982V6.03H2.818v7.364zm7.739-11.83l.87-1.29a.173.173 0
            00-.054-.246.188.188 0 00-.256.052l-.902 1.335A6.092 6.092 0 007.985
            1a6.1 6.1 0 00-2.232.416L4.853.08a.19.19 0 00-.257-.05.173.173 0
            00-.055.246l.871 1.29c-1.57.739-2.628 2.131-2.628 3.729 0
            .098.006.195.015.29H13.17c.009-.095.014-.192.014-.29
            0-1.598-1.059-2.99-2.628-3.73zM5.58 3.875a.489.489 0
            01-.5-.48c0-.265.224-.478.5-.478.277 0 .5.213.5.478a.489.489 0
            01-.5.48zm4.809 0a.489.489 0
            01-.5-.48c0-.265.224-.478.5-.478s.498.213.498.478a.488.488 0
            01-.498.48zm4.458 1.985h-.046c-.614 0-1.117.482-1.117 1.07v4.665c0
            .59.503 1.071 1.117 1.071h.047c.615 0 1.115-.482
            1.115-1.071V6.93c0-.589-.501-1.072-1.116-1.072z" >
											</path>
										</svg>
									}
								</div>
								<ReviewsComponent gameId={params.gameId} />
							</div>
						</div>
					</div>
				</>
			}
		</Container >
		<Footer />
	</>
}

export default GamePage
