describe("Users", () => {
  it("should render users list table", () => {
    cy.visit("http://localhost:5173");

    // cy.findByRole("link", { name: /go-to-login/i }).click();
    cy.get('[data-testid="go-to-login"]').click();

    // login
    cy.get('input[name="username"]').type("Rolph");
    cy.get("input:password").type("password");
    cy.get("#persist").click();
    cy.get("button:submit").click();

    // go to users
    cy.get("button[title='Users']").click();

    cy.get("table").should("exist");
  });
});
