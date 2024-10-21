import "./AddToCustomListComponent.scss"
import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { Check } from "react-bootstrap-icons"
import { useParams } from "react-router-dom"

const AddToCustomListComponent = () => {
  const [show, setShow] = useState(false)
  const [customLists, setCustomLists] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPresent, setIsPresent] = useState([])

  const token = localStorage.getItem("token")

  const params = useParams()

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const url = import.meta.env.VITE_URL

  const handleSubmit = (ev, listId, remove) => {
    ev.preventDefault()
    if (remove) {
      const index = isPresent.indexOf(listId)
      removeFromList(listId)
      isPresent.splice(index, 1)
    }
    else addToList(listId)
  }

  const removeFromList = async listId => {
    try {
      const resp = await fetch(`${url}/customLists/${listId}/${params.gameId}`, {
        method: "DELETE",
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      fetchCustomLists()
    } catch (error) {
      console.log(error)
    }
  }

  const addToList = async listId => {
    try {
      const resp = await fetch(url + "/customLists/" + listId, {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          gameId: params.gameId
        })
      })
      const data = resp.json()
      if (resp.ok) {
        checkPresence(listId)
      } else throw new Error(data.message)
    } catch (error) {
      console.log(error)
    }

  }

  const checkPresence = async listId => {
    try {
      const resp = await fetch(url + "/customLists/games/" + listId, {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await resp.json()
      if (resp.ok) {
        data.forEach(game => {
          if (game.gameId === parseInt(params.gameId) && !isPresent.includes(listId)) {
            setIsPresent(isPresent => [...isPresent, listId])
          }
        })
      } else throw new Error(data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCustomLists = async () => {
    setIsLoaded(false)
    try {
      const resp = await fetch(url + "/customLists", {
        headers: {
          "Authorization": "Bearer " + token
        }
      })
      const data = await resp.json()
      if (resp.ok) {
        setCustomLists(data)
        data.forEach(list => checkPresence(list.id))
      } else throw new Error(data.message)
    } catch (error) {
      console.log(error.message)
    } finally {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    fetchCustomLists()
  }, [])

  return <>
    <Button
      className="mt-3 rounded rounded-pill "
      onClick={handleShow}
    >
      Add to Custom List
    </Button>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Custom Lists</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customLists.map(list => <div
          key={list.id}
          className="truncate customList rounded py-1 py-2 px-1 d-flex justify-content-between"
          role="button"
          onClick={isPresent.includes(list.id) ?
            ev => handleSubmit(ev, list.id, "remove") :
            ev => handleSubmit(ev, list.id)
          }
        >
          <p className="m-0">{list.title}</p>
          <Form.Check
            type={"radio"}
            checked={isPresent.includes(list.id)}
            readOnly
          />
        </div>
        )}
      </Modal.Body>
    </Modal>
  </>
}

export default AddToCustomListComponent
