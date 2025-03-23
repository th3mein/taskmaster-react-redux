import { screen } from "@testing-library/react";
import NewUserForm from "../NewUserForm";
import { renderWithProviders } from "@/tests/test.utils";

describe("New User Form", () => {
  it("should render disabled save button", async () => {
    renderWithProviders(<NewUserForm />);

    const saveButton = screen.getByRole("button", { name: /save/i });
    expect(saveButton).toBeDisabled();
  });

  // it("should enable save button after form is filled", async () => {
  //   renderWithProviders(<NewUserForm />);

  //   await waitFor(() => {
  //     const userNameInput = screen.getByRole("textbox", {
  //       name: /username/i,
  //     });
  //     const passwordInput = screen.getByLabelText(/password/i);

  //     fireEvent.change(userNameInput, {
  //       target: { value: "Antonette" },
  //     });
  //     fireEvent.change(passwordInput, {
  //       target: { value: "@#*domuDD6" },
  //     });

  //     const saveButton = screen.getByRole("button", { name: /save/i });

  //     expect(saveButton).toBeEnabled();
  //   });
  // });
});
