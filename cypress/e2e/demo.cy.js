describe('Test Demo Page', () => {
    it('Navigate from Home to Demo and find a slider', () => {
        cy.visit('http://localhost:3000/');

        cy.contains("Try a Demo").click();

        cy.url().should('include', '/demo');

        cy.get('[data-cy="sliderThumb0"]')

        cy.get('[data-cy="lightmode"]').click();
    })
})