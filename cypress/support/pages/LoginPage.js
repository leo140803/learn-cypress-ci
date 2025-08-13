export class LoginPage {
    visit() {
      cy.visit('http://127.0.0.1:5500/login.html');
    }

    fillEmail(email) {
      cy.get('[data-cy="email"]').type(email);
    }
  
    fillPassword(password) {
      cy.get('[data-cy="password"]').type(password);
    }
  
    clickLogin() {
      cy.get('[data-cy="button"]').click();
    }
  
    assertRedirectedToDashboard() {
      cy.url().should('include', '/dashboard');
      cy.contains('Selamat Datang di Dashboard');
    }
  }