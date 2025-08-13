import { LoginPage } from "../support/pages/LoginPage";

describe('Login Page', () => {
  const loginPage = new LoginPage();
  beforeEach(() => {
    loginPage.visit();
  })
  it('Berhasil dan masuk ke dashboard', () => {
    loginPage.fillEmail("nickholasleonardo@gmail.com");
    loginPage.fillPassword("123PASS");
    loginPage.clickLogin();
    loginPage.assertRedirectedToDashboard();
  })

  it('Gagal login dengan password salah', () => {
    loginPage.fillEmail("nickholasleonardo@gmail.com");
    loginPage.fillPassword("salah");
    loginPage.clickLogin();

    // Pastikan tetap di halaman login
    cy.url().should('include', '/login');

    // Cek pesan error ditampilkan
    cy.get('#error-message').should('be.visible').and('contain', 'Email atau password salah!');
  });

  it('Gagal login dengan email salah', () => {
    loginPage.fillEmail("salah@email.com");
    loginPage.fillPassword("123PASS");
    loginPage.clickLogin();

    cy.url().should('include', '/login');
    cy.get('#error-message').should('be.visible');
  });
})