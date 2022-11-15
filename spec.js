describe("/Login testcase", () => {
  const EXISTING_USER_EMAIL = "fale_user1@officehourtesting.com";
  const EXISTING_USER_PASSWORD = "123456";

  it("redirects to login when no cookies found", () => {
    cy.clearCookies();
    cy.visit("http://localhost:3000");
    cy.location("pathname", should("eq", "/login"));
  });

  it("sees error on email field when clicking login with empty form", () => {
    cy.clearCookies();
    cy.visit("http://localhost:3000/login");

    cy.get('[data-test="submit-login"]').click();
    cy.get('[data-test="email-error"]').should("be.visible");
    cy.get('[data-test="password-error"]').should("be.visible");

    cy.get('[data-test="email"]').type(`${EXISTING_USER_EMAIL}`);
    cy.get('[data-test="password-error"]').should("be.visible");
  });
});
