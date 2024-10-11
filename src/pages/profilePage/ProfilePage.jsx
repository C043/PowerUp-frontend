import "./ProfilePage.scss"
import { Button, Container } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"
import { useSelector } from "react-redux"

const ProfilePage = () => {
    const user = useSelector(state => state.user)

    return <>
        <NavBar />
        <Container>
            <div className="d-flex gap-3 mt-3">
                <img src={user.avatar} className="bigPropic rounded rounded-circle" />
                <div className="d-flex flex-column">
                    <h1>{user.username}</h1>
                    <div className="d-flex gap-2 ">
                        <Button
                            className="rounded rounded-pill" variant="info"
                        >
                            Backlog
                        </Button>
                        <Button
                            className="rounded rounded-pill" variant="danger"
                        >
                            Playing
                        </Button>
                        <Button
                            className="rounded rounded-pill"
                        >
                            Played
                        </Button>
                    </div>
                </div>
            </div>
        </Container>
    </>
}

export default ProfilePage
