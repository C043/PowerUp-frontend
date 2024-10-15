import { useEffect, useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"

const GameNotesComponent = ({ gameId }) => {
    const [notes, setNotes] = useState("")
    const [show, setShow] = useState(false)

    const token = localStorage.getItem("token")

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    const handleSubmit = ev => {
        ev.preventDefault()
    }

    const fetchNotes = async () => {
        try {
            const resp = await fetch("http://localhost:3001/notes/" + gameId, {
                headers: {
                    "Authorization": "Bearer " + token
                },
            })
            if (resp.ok) {
                const data = await resp.json()
                setNotes(data)
            } else throw new Error(resp.message)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        fetchNotes()
    }, [])
    return <>
        <p className="h2">Notes</p>
        {notes ?
            <>
                <p>{notes.notes}</p>
                <Button onClick={handleShow}>Edit Notes</Button>
            </> :
            <Button>Add Notes</Button>
        }
        <Modal className="notesModal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3" controlId="notesTextArea">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={5} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button
                    variant="primary"
                    onClick={ev => handleSubmit(ev)}
                >
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default GameNotesComponent
