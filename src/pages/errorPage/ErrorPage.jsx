import "./ErrorPage.scss"
import { useNavigate } from "react-router-dom"
import Footer from "../../components/footer/Footer.jsx"
import { Alert, Button, Container, Navbar } from "react-bootstrap"

const ErrorPage = () => {
    const navigate = useNavigate()
    return <>
        <Navbar />
        <Container>
            <div className="errorElement d-flex flex-column gap-2 align-items-center justify-content-center">
                <Alert variant="danger">404 Not Found</Alert>
                <Button
                    className="rounded rounded-pill"
                    onClick={() => navigate("/")}
                >
                    Go Back
                </Button>
            </div>
        </Container>
        <Footer />
    </>
}

export default ErrorPage
