export default {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    video: false,
    browser: 'chrome',
    args: ['--disable-gpu'],
  },
};
