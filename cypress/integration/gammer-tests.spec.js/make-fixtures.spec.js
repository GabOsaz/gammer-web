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

        // Navigates to the "Fix Game" tab
        cy.findByRole('link', {name: /fix game/i}).click();
        cy.url().should('include', '/fixGame');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1)').click();
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div:nth-child(2) > div > div:nth-child(1) > div').click()
        cy.findByRole('button', {name: /schedule/i}).click();
        cy.findByRole('heading', {name: /Select a school here/i});
        cy.get('#2').click();
        cy.get('#some-state').click();
        cy.findByRole('button', {name: /schedule/i}).click();
        cy.contains(/Successfully Created!/i);

        // Log out 
        cy.findByRole('button', {name: /avatar/i}).click();
        cy.findByText(/log out/i).click();        
        cy.url().should('include', '/');
    })
})