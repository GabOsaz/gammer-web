describe('tests the accute functionalities of the game master web app', () => {
    beforeEach(function () {
        cy.visit('https://gammer-web.vercel.app/'); // visit page
        cy.findByRole('button', {name: /get started/i}).click();
    });

    it('enables a game master sign up school unsuccessfully', () => {
        
        // Sign up
        cy.findByRole('textbox', {name: /school name/i}).type('Cypress School');
        cy.findByRole('textbox', {name: /state/i}).click();
        cy.get('#root > div > div > div:nth-child(2) > div:nth-child(2) > section > div > div > div > div > form > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div > div > div > div > div:nth-child(2) > div > div:nth-child(2) > div').click()
        cy.findByRole('textbox', {name: /year/i}).type('1957');
        cy.findByRole('textbox', {name: /email address/i}).type('cypress@example.com');
        cy.findByRole('textbox', {name: /phone number/i}).type('09028763274');
        cy.findByRole('textbox', {name: /first name/i}).type('Cypress');
        cy.findByRole('textbox', {name: /last name/i}).type('Testing');
        cy.findByRole('button', {name: /sign up/i}).click();
        cy.contains('School already registered') // That is because it already does exist
    });
})