export default class LoginPage {
    // --- SELECTORS pakai data-cy & id (stabil) ---
    els = {
      email:       () => cy.get('[data-cy="email"]'),
      password:    () => cy.get('[data-cy="password"]'),
      submitBtn:   () => cy.get('[data-cy="button"]'),
      errorMsg:    () => cy.get('#error-message'),
    };
  
    // --- ACTIONS ---
    visit() { cy.visit('/login.html'); }
  
    typeEmail(email) {
      this.els.email().clear().type(email);
    }
  
    typePassword(pw) {
      this.els.password().clear().type(pw, { log: false });
    }
  
    submit() {
      this.els.submitBtn().click();
    }
  
    login(email, pw) {
      this.typeEmail(email);
      this.typePassword(pw);
      this.submit();
    }
  
    // --- ASSERTIONS / HELPERS ---
    assertErrorVisible() {
      this.els.errorMsg().should('be.visible').and('contain.text', 'Email atau password salah');
    }
  
    assertErrorHidden() {
      this.els.errorMsg().should('not.be.visible');
    }
  
    assertRedirectToDashboard() {
      cy.location('pathname').should('include', '/dashboard.html');
    }
  
    assertEmailInvalid() {
      // gunakan HTML5 validity
      this.els.email().then(($el) => {
        expect($el[0].checkValidity()).to.eq(false);
        expect($el[0].validationMessage).to.not.equal(''); // ada pesan native browser
      });
    }
  
    assertRequiredBlocking() {
      // submit tanpa isi → form HTML5 harus menolak submit (error tetap hidden)
      this.assertErrorHidden();
      this.els.email().should('have.prop', 'validationMessage'); // ada native validation
    }
  }