import { useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row } from "react-bootstrap"
import SingleCustomList from "../singleCustomList/SingleCustomList"

const CustomListsComponent = () => {
  const [customLists, setCustomLists] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState("")

  const token = localStorage.getItem("token")

  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  const url = import.meta.env.VITE_URL

  const handleSubmit = ev => {
    ev.preventDefault()
    postCustomList()
  }

  const postCustomList = async () => {
    try {
      const resp = await fetch(url + "/customLists", {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title: title
        })
      })
      const data = await resp.json()
      if (resp.ok) {
        handleClose()
        setTitle("")
        fetchCustomLists()
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

  return <div className="mt-5">
    <p className="h2">Custom Lists</p>
    {customLists.length === 0 && isLoaded &&
      <>
        <p>No Custom Lists here, add one!</p>
      </>
    }
    <Row className="w-100 mt-3 g-2">
      {customLists.map(list => {
        return <Col xs="12" md="6" lg="3" key={list.id}>
          <SingleCustomList title={list.title} listId={list.id} />
        </Col>
      })}
    </Row>
    <Button
      className="rounded rounded-pill mt-3"
      onClick={handleShow}
    >
      Add Custom List
    </Button>
    <Modal className="addCustomListModal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Custom List</Modal.Title>
      </Modal.Header>
      <Form onSubmit={ev => handleSubmit(ev)}>
        <Modal.Body>
          <Form.Label>Custom List Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={"20"}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  </div>
}

export default CustomListsComponent
