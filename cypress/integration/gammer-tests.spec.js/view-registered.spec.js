describe('tests the accute functionalities of the game master web app', () => {
    beforeEach(function () {
        cy.visit('https://gammer-web.vercel.app/'); // visit page
        cy.findByRole('button', {name: /get started/i}).click();
    });

    it('logs in an admin and view registered schools', () => {

        // Admin Log in
        cy.findByText(/log in now/i).click();
        cy.findByRole('textbox', {name: /email/i}).type('admin@example.com');
        cy.findByPlaceholderText(/password/i).type('admin123');
        cy.findByRole('button', {name: /log in/i}).click();
        cy.contains('Authentication successful!');

        // Navigates to dashboard's "Registered" tabs
        cy.url().should('include', '/registeredSchools')
        cy.contains('Registered Schools');
        cy.get('#accordionId').click();
        cy.contains('Accept?').click();

        // Log out 
        cy.findByRole('button', {name: /avatar/i}).click();
        cy.findByText(/log out/i).click();        
        cy.url().should('include', '/');
    })
})