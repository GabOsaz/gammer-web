describe('tests the functionality of a game master', () => {
    it('enables a game master sign up successfully', () => {
        // visit page
        cy.visit('http://localhost:3000');
        cy.getByRole('button', {
            name: /get started/i
          }).click()
        // 
    })
})