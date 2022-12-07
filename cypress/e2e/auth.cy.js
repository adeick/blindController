describe('Google', function () {
    beforeEach(function () {
        //   cy.task('db:seed')
        cy.loginByGoogleApi()
    })

    it('shows onboarding', function () {
        cy.visit('http://localhost:3000/');

        // cy.contains('').should('be.visible')
    })
})