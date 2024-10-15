import { useEffect, useState } from "react"
import { Button } from "react-bootstrap"

const GameNotesComponent = ({ gameId }) => {
    const [notes, setNotes] = useState("")

    const token = localStorage.getItem("token")

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
        {notes && <p>{notes.notes}</p>}
        <Button>Add Notes</Button>
    </>
}

export default GameNotesComponent
