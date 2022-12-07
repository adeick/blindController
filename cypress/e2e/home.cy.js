describe('Test Home', () => {
  it('testingone', () => {
    cy.visit('http://localhost:3000/');

    cy.contains("Login")

    cy.contains("Log In")

    cy.contains("Try a Demo")

    cy.get('[data-cy="gitlab"]').invoke('removeAttr', 'target').click();

    cy.url().should('eq', '');

    cy.visit('http://localhost:3000/');

    cy.get('[data-cy="sd"]').invoke('removeAttr', 'target').click();

    cy.url().should('eq', '');
  })
})