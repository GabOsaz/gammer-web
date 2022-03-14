describe('tests the accute functionalities of the game master web app', () => {
    beforeEach(function () {
        cy.visit('http://localhost:3000'); // visit page
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

    it('enables an administrator log in and perform some main actions', () => {

        // Admin Log in
        cy.findByText(/log in now/i).click();
        cy.findByRole('textbox', {name: /email/i}).type('admin@example.com');
        cy.findByPlaceholderText(/password/i).type('admin123');
        cy.findByRole('button', {name: /log in/i}).click();
        cy.contains('Authentication successful!');

        // Navigates to dashboard's "Registered" tabs
        cy.url().should('include', '/registeredSchools')
        cy.contains('Registered Schools');
        cy.contains('Cypress School');
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(4) > div').click();
        cy.contains('Accept?').click();

        // Navigates to the "Accepted" tab
        cy.findByRole('link', {name: /Accepted/i}).click();
        cy.url().should('include', '/acceptedSchools')
        cy.get('#root > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div > div:nth-child(2)').click();
        cy.contains(/school name/i);
        cy.contains(/state/i);
        cy.contains(/year founded/i);
        cy.contains(/Game master's name/i);
        cy.contains(/Game master's email/i);
        cy.contains(/Game master's phone number/i);

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

        // Navigates to the "Fixtures" tab
        cy.findByRole('link', {name: /fixtures/i}).click();
        cy.url().should('include', '/fixtures');
        cy.contains(/List of Match Fixtures/i);
        cy.get('#fixtures-list').click();

        // Log out 
        cy.findByRole('button', {name: /avatar/i}).click();
        cy.findByText(/log out/i).click();        
        cy.url().should('include', '/');
    })
})