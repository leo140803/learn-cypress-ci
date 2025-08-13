const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:5500/", // jalankan static server-mu di sini
    viewportWidth: 1366,
    viewportHeight: 768,
    retries: { runMode: 1, openMode: 0 },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
