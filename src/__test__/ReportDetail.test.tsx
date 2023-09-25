import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ReportDetail from "../components/ReportDetail"

describe('ReportDetail', async () => {
  it('should render the skeleton headings if props are empty', async () => {
    render(<ReportDetail value="" legend="" />)
    const skeletonHeaderEl = screen.getAllByRole("heading")
    expect(skeletonHeaderEl.length).toEqual(2);
  })

  it('should render the value', async () => {
    render(<ReportDetail value="25" legend="" />)
    const headerEl = screen.getByText("25")
    expect(headerEl).toHaveTextContent("25");
  })

  it('should render the legened', async () => {
    render(<ReportDetail value="25" legend="sold units" />)
    const legendEl = screen.getByText(/sold units/i)
    expect(legendEl).toHaveTextContent(/sold units/i);
  })
})