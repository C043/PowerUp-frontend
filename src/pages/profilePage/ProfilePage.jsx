import "./ProfilePage.scss"
import { Button, Container, Form, Modal, Spinner } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Controller, Pencil, Substack } from "react-bootstrap-icons"
import { useState } from "react"
import AllGamesComponent from "../../components/allGamesComponent/AllGamesComponent"
import Footer from "../../components/footer/Footer"
import CustomListsComponent from "../../components/customListsComponent/CustomListsComponent"

const ProfilePage = () => {
    const [show, setShow] = useState(false)
    const [file, setFile] = useState(null)
    const [isLoaded, setIsLoaded] = useState(true)

    const token = localStorage.getItem("token")

    const user = useSelector(state => state.user)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false)

    const handleSubmit = async ev => {
        ev.preventDefault()
        const body = new FormData()
        body.append("avatar", file)
        try {
            setIsLoaded(false)
            const resp = await fetch(import.meta.env.VITE_URL + "/users/me/avatar", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                body: body
            })
            if (resp.ok) {
                handleClose()
                fetchUser()
            } else throw new Error(resp.message)
        } catch (error) {
            console.log(error.message)
        } finally {
            setIsLoaded(true)
        }
    }

    const fetchUser = async () => {
        try {
            const resp = await fetch(import.meta.env.VITE_URL + "/users", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            const data = await resp.json();
            if (resp.ok) {
                dispatch({
                    type: "USER",
                    payload: data
                })
            } else throw new Error(data);
        } catch (error) {
            console.log(error);
        }
    };

    return <>
        <NavBar />
        <Container>
            <div className="d-flex flex-column flex-md-row align-items-center 
                align-items-md-start gap-3 mt-3">
                <div className="position-relative">
                    <img src={user.avatar}
                        className="bigPropic rounded rounded-circle"
                    />
                    <div
                        role="button"
                        className="bg-secondary rounded rounded-circle 
                        ratio ratio-1x1 position-absolute top-100 start-50
                        translate-middle editIcon"
                        onClick={handleShow}
                    >
                        <Pencil color="dark" className="p-2" />
                    </div>

                </div>
                <div className="d-flex flex-column align-items-center
                    align-items-md-start">
                    <h1>{user.username}</h1>
                    <div className="d-flex gap-2 ">
                        <Button
                            className="rounded rounded-pill" variant="secondary"
                            onClick={() => navigate("/backlog")}
                        >
                            <Substack className="mb-1 me-1" />Backlog
                        </Button>
                        <Button
                            className="rounded rounded-pill" variant="info"
                            onClick={() => navigate("/playing")}
                        >
                            <Controller className="mb-1 me-1" />Playing
                        </Button>
                        <Button
                            className="rounded rounded-pill"
                            onClick={() => navigate("/played")}
                        >
                            <CheckCircle className="mb-1 me-1" />Played
                        </Button>
                    </div>
                </div>
            </div>
            <CustomListsComponent />
            <AllGamesComponent />
            <Footer />
        </Container>
        <Modal className="editProfileModal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile Picture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-column align-items-center">
                    {isLoaded ? <img src={user.avatar}
                        className="bigPropic rounded rounded-circle"
                    /> :
                        <Spinner variant="primary" className="loading" />
                    }
                    <Form.Group controlId="formFile" className="my-3">
                        <Form.Control
                            type="file"
                            value={file ? file[name] : ""}
                            onChange={ev => setFile(ev.target.files[0])}
                            required
                        />
                    </Form.Group>
                </div>
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

export default ProfilePage
