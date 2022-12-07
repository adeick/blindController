const { defineConfig } = require("cypress");

// require('.env.local').config();

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    googleRefreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    googleClientId: process.env.GOOGLE_ID,
    googleClientSecret: process.env.GOOGLE_SECRET
  }
});
