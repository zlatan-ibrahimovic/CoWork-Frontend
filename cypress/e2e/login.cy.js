describe('Login Page', () => {
    it('should display the login form', () => {
      console.log('Visiting URL:', Cypress.config('baseUrl') + '/login');
      cy.visit('/login');
      cy.contains('Connexion');
      cy.get('input[formControlName="email"]').should('be.visible');
      cy.get('input[formControlName="password"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible'); // Vérifie que le bouton de connexion est affiché
    });
  });
  