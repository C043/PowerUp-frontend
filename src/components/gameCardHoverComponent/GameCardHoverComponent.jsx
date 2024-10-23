import { CheckCircle, Controller, Substack } from "react-bootstrap-icons"
import "./GameCardHoverComponent.scss"
import { useEffect, useState } from "react"

const GameCardHoverComponent = ({ gameId }) => {
  const [backlog, setBacklog] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [played, setPlayed] = useState(false)
  const [list, setList] = useState("")

  const token = localStorage.getItem("token")

  const url = import.meta.env.VITE_URL

  const addToList = async (list) => {
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
    try {
      const resp = await fetch(`${url}/lists/${list}/${gameId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token,
        }
      })
    } catch (error) {
      console.log(error.message)
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
      onClick={() => {
        if (backlog) {
          removeFromList("backlog")
          setBacklog(false)
        }
        else addToList("backlog")
      }}
    />
    <Controller
      role="button"
      color={playing ? "red" : "white"}
      onClick={() => {
        if (playing) {
          removeFromList("playing")
          setPlaying(false)
        }
        else addToList("playing")
      }}
    />
    <CheckCircle
      role="button"
      color={played ? "#1ad214" : "white"}
      onClick={() => {
        if (played) {
          removeFromList("played")
          setPlayed(false)
        }
        else addToList("played")
      }}
    />
  </div>
}

export default GameCardHoverComponent
