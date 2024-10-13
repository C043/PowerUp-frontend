import "./ProfilePage.scss"
import { Button, Container } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Controller, Substack } from "react-bootstrap-icons"

const ProfilePage = () => {
    const user = useSelector(state => state.user)

    const navigate = useNavigate()

    return <>
        <NavBar />
        <Container>
            <div className="d-flex flex-column flex-md-row align-items-center 
                align-items-md-start gap-3 mt-3">
                <img src={user.avatar} className="bigPropic rounded
                    rounded-circle" />
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
                            className="rounded rounded-pill" variant="danger"
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
        </Container>
    </>
}

export default ProfilePage
