import { CheckCircle, Controller, Substack } from "react-bootstrap-icons"
import "./GameCardHoverComponent.scss"
import { useEffect, useState } from "react"

const GameCardHoverComponent = ({ gameId }) => {
  const [backlog, setBacklog] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(false)
  const [list, setList] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const token = localStorage.getItem("token")

  const url = import.meta.env.VITE_URL

  const addToList = async (list) => {
    setIsLoading(true)
    try {
      const resp = await fetch(`${url}/lists/${list}`, {
        method: "POST",
        body: JSON.stringify({
          gameId: gameId,
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
    } finally {
      setIsLoading(false)
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
          listItem.gameId === parseInt(gameId)
        )
        if (isPresent.length > 0) {
          switch (list) {
            case "backlog": {
              setBacklog(true)
              setPlayed(false)
              setPlaying(false)
              setList("backlog")
              break
            }
            case "playing": {
              setPlaying(true)
              setBacklog(false)
              setPlayed(false)
              setList("playing")
              break
            }
            case "played": {
              setPlayed(true)
              setBacklog(false)
              setPlaying(false)
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

  const removeFromList = async list => {
    setIsLoading(true)
    try {
      const resp = await fetch(`${url}/lists/${list}/${gameId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLists("backlog")
    fetchLists("playing")
    fetchLists("played")
  }, [])

  return <div className="addToLists flex-column gap-2 rounded">
    <Substack
      role="button"
      color={backlog ? "#a997df" : "white"}
      onClick={isLoading ? "" : () => {
        if (backlog) {
          setBacklog(false)
          removeFromList("backlog")
        }
        else {
          setBacklog(true)
          setPlaying(false)
          setPlayed(false)
          addToList("backlog")
        }
      }}
    />
    <Controller
      role="button"
      color={playing ? "#16DFE9" : "white"}
      onClick={isLoading ? "" : () => {
        if (playing) {
          setPlaying(false)
          removeFromList("playing")
        }
        else {
          setPlaying(true)
          setBacklog(false)
          setPlayed(false)
          addToList("playing")
        }
      }}
    />
    <CheckCircle
      role="button"
      color={played ? "#1ad214" : "white"}
      onClick={isLoading ? "" : () => {
        if (played) {
          setPlayed(false)
          removeFromList("played")
        }
        else {
          setPlayed(true)
          setBacklog(false)
          setPlaying(false)
          addToList("played")
        }
      }}
    />
  </div>
}

export default GameCardHoverComponent
