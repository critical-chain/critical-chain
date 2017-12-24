// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.columns')
      .assert.containsText('h3', 'This is a blank slate')
      .end();
  },

  'should add edtimation': function(browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000);

    browser.expect.elementActive().to.be.a('#new-estimation-title');
    browser.setValue('#new-estimation-title', 'Shopping list');
    browser.click('button[title="Add estimation"]');
    browser.expect.element('.menu-heading').text.to.eq('Shopping list');

    browser.end();
  }
}
