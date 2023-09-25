import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import App from "../App"

describe('App', async () => {
  it('should render the heading', async () => {
    render(<App />)
    const element = screen.getByText(/report/i)
    expect(element).toBeInTheDocument()
  })
})