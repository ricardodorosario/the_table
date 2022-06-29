import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

test("renders The Table title", async () => {
  render(<App />);
  await waitFor(() => {
    const title = screen.getByText("The Table");
    expect(title).toBeInTheDocument();
  });
});
