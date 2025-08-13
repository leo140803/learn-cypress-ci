import LoginPage from './/../pageobjects/LoginPage';
const lp = new LoginPage();

// kredensial sesuai script di halaman HTML
const VALID_EMAIL = 'nickholasleonardo@gmail.com';
const VALID_PASS  = '123PASS';

describe('Login Page (POM)', () => {
  beforeEach(() => {
    lp.visit();
  });

  it('TC-LOGIN-001: sukses login dengan kredensial valid → redirect dashboard', () => {
    lp.assertErrorHidden();
    lp.login(VALID_EMAIL, VALID_PASS);
    lp.assertRedirectToDashboard();
  });

  it('TC-LOGIN-002: gagal login (password salah) → tampil error, tidak redirect', () => {
    lp.login(VALID_EMAIL, 'SALAH123');
    lp.assertErrorVisible();
    cy.location('pathname').should('include', '/login.html'); // tetap di login
  });

  it('TC-LOGIN-003: field required → form HTML5 menolak submit & error custom tetap hidden', () => {
    // langsung klik submit tanpa isi apa-apa
    lp.submit();
    lp.assertRequiredBlocking();
    lp.assertErrorHidden(); // script error kamu hanya tampil kalau kredensial salah
  });

  it('TC-LOGIN-004: email format invalid → HTML5 validity gagal', () => {
    lp.typeEmail('bukan-email');
    lp.typePassword('apaaja');
    lp.submit();            // browser block submit karena type="email"
    lp.assertEmailInvalid();
    lp.assertErrorHidden();
  });

  it('TC-LOGIN-005: case-sensitive password → salah huruf besar/kecil harus gagal', () => {
    lp.login(VALID_EMAIL, '123pass'); // beda case
    lp.assertErrorVisible();
  });
});
