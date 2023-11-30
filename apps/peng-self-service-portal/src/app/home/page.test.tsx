import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  test("should render Home", () => {
    render(<Home />);
    expect(
      screen.getByText("This is homepage with a TextField")
    ).toBeInTheDocument();
  });
});
