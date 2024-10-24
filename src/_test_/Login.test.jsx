import { fireEvent, render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import LoginComponent from "../components/LoginComponent.jsx"
import { BrowserRouter } from "react-router-dom"

describe("Login", () => {
    it("Is present", () => {
        render(<BrowserRouter>
            <LoginComponent />
        </BrowserRouter>)
        screen.debug()
        const loginInput = screen.getByPlaceholderText("Password")
        expect(loginInput).toBeInTheDocument()
    })
    it("Is validated", () => {
        render(<BrowserRouter>
            <LoginComponent />
        </BrowserRouter>)
        screen.debug()
        const loginInput = screen.getByPlaceholderText("Password")
        const email = screen.getByPlaceholderText("Enter email")
        const button = screen.getByText("Submit")
        expect(button).toBeInTheDocument()
        fireEvent.click(email)
        fireEvent.change(email, { target: { value: "test@gmail.com" } })
        fireEvent.click(loginInput)
        fireEvent.change(loginInput, { target: { value: '123' } });
        fireEvent.click(button)
        expect(screen.getByText("Please lengthen this text to 8 characters or more (you are currently using 3 characters).")).toBeInTheDocument()
    })
})
