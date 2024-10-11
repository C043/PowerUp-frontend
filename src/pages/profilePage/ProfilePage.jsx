import { Container } from "react-bootstrap"
import NavBar from "../../components/navBar/NavBar"

const ProfilePage = () => {
    const user = localStorage.getItem("user")
    return <>
        <NavBar />
        <Container>
        </Container>
    </>
}

export default ProfilePage
