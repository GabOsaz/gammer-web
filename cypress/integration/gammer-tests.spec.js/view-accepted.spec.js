describe('tests the accute functionalities of the game master web app', () => {
    beforeEach(function () {
        cy.visit('https://gammer-web.vercel.app/'); // visit page
        cy.findByRole('button', {name: /get started/i}).click();
    });

    it('logs in an admin and views accepted schools', () => {

        // Admin Log in
        cy.findByText(/log in now/i).click();
        cy.findByRole('textbox', {name: /email/i}).type('admin@example.com');
        cy.findByPlaceholderText(/password/i).type('admin123');
        cy.findByRole('button', {name: /log in/i}).click();
        cy.contains('Authentication successful!');

        // Navigates to the "Accepted" tab
        cy.findByRole('link', {name: /Accepted/i}).click();
        cy.url().should('include', '/acceptedSchools');
        cy.get('#accordionId').click();
        cy.contains(/school name/i);
        cy.contains(/state/i);
        cy.contains(/year founded/i);
        cy.contains(/Game master's name/i);
        cy.contains(/Game master's email/i);
        cy.contains(/Game master's phone number/i);

        // Log out 
        cy.findByRole('button', {name: /avatar/i}).click();
        cy.findByText(/log out/i).click();        
        cy.url().should('include', '/');
    })
})