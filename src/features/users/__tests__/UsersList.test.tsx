import { http, HttpResponse } from "msw";
import { server } from "@/tests/server";
import { screen, waitFor } from "@testing-library/react";
import UsersList from "../UsersList";
import { renderWithProviders } from "@/tests/test.utils";

describe("Users List", () => {
  it("should handle error response", async () => {
    // force msw to return error response
    server.use(
      http.get("http://localhost:3500/users", async () => {
        return HttpResponse.json(null, {
          status: 500,
        });
      })
    );

    renderWithProviders(<UsersList />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    const errorText = await screen.findByTestId("error-message");
    expect(errorText).toBeInTheDocument();
  });

  it("should render loading state initially", async () => {
    renderWithProviders(<UsersList />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
  it("should render users list [header + 3 users]", async () => {
    renderWithProviders(<UsersList />);

    await waitFor(() => {
      const rows = screen.getAllByRole("row");
      expect(rows.length).toBe(4);
    });
  });
  it("should render table header", async () => {
    renderWithProviders(<UsersList />);

    await waitFor(() => {
      const firstColumnCells = screen
        .getAllByRole("row")[0]
        .querySelectorAll("th");

      expect(firstColumnCells[0]).toHaveTextContent(/username/i);
      expect(firstColumnCells[1]).toHaveTextContent(/Roles/i);
    });
  });
});
