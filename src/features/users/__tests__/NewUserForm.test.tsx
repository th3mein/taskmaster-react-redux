import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
// import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import NewUserForm from "../NewUserForm";

it("should render disabled save button", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <NewUserForm />
      </BrowserRouter>
    </Provider>
  );
  // expect(screen.getByText(/save/i)).not.toBeDisabled();

  const saveButton = screen.getByRole("button", { name: /save/i });
  expect(saveButton).toBeDisabled();
  // expect(await screen.findByRole('button', { name: /pay/i })).toBeDisabled();
  // userEvent.type(screen.getByPlaceholderText(/amount/i), "50");
  // userEvent.type(screen.getByPlaceholderText(/add a note/i), "dinner");
  // expect(await screen.findByRole('button', { name: /pay/i })).toBeEnabled();
});
