import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Header from "../components/Header"

describe('Header', async () => {
  it('should render the heading', async () => {
    render(<Header />)
    const headerEl = screen.getByRole("heading")
    expect(headerEl).toBeInTheDocument();
  })

  it('should render the logo', async () => {
    render(<Header />)
    const logoEl = screen.getByAltText(/logo/i)
    expect(logoEl).toBeInTheDocument();
  })
})
