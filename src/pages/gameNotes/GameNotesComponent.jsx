import "./GameNotesComponent.scss"
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

    const fetchNotes = async () => {
        try {
            const resp = await fetch("http://localhost:3001/notes/" + gameId, {
                headers: {
                    "Authorization": "Bearer " + token,
                },
            })
            const data = await resp.json()
            if (resp.ok) {
                setNotes(data.notes)
            } else throw new Error(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const writeNotes = async () => {
        try {
            const resp = await fetch("http://localhost:3001/notes", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    notes: notes,
                    gameId: gameId,
                }),
            })
            const data = await resp.json()
            if (resp.ok) {
                fetchNotes()
            } else throw new Error(data.message)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = ev => {
        ev.preventDefault()
        handleClose()
        writeNotes()
    }

    useEffect(() => {
        fetchNotes()
    }, [])
    return <>
        <p className="h2">Notes</p>
        {notes ?
            <>
                <p className="gameNotes">{notes}</p>
                <Button onClick={handleShow}>Edit Notes</Button>
            </> :
            <Button onClick={handleShow}>Add Notes</Button>
        }
        <Modal className="notesModal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Notes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3 notesTextArea" controlId="notesTextArea">
                    <Form.Control as="textarea" rows={5} value={notes} onChange={ev => setNotes(ev.target.value)} />
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
