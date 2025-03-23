import { ReactElement } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { setupStore } from "../app/store";
import { setupListeners } from "@reduxjs/toolkit/query";
import { BrowserRouter } from "react-router-dom";
export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }: { children: unknown }) {
    return (
      <Provider store={store}>
        <BrowserRouter>{children as ReactElement}</BrowserRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
