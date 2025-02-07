const testData = require('../utils/testdata.json');

class SettingsPage {
  constructor(page) {
    this.page = page;

    // Locale-Specific URLs
    this.baseUrl = testData.initialUrl;
    this.localeOptions = testData.localeOptions;
  }

  // **Navigate to Locale-Specific URL**
  async navigateToLocaleUrl(localeKey) {
    const localeData = this.localeOptions[localeKey];
    if (!localeData) {
      console.error("Available locale options:", this.localeOptions);
      throw new Error(`Locale '${localeKey}' not found in test data.`);
    }

    const parts = localeKey.split('-');
    if (parts.length !== 2) {
      throw new Error(`Invalid localeKey format: '${localeKey}'. Expected format 'xx-YY'.`);
    }

    // Handle specific key for 'en-GB' with 'ENurl'
    const queryParamKey = localeKey === "en-GB" ? "ENurl" : `${parts[1]}url`;
    const localeUrl = localeData[queryParamKey];
    if (!localeUrl) {
      throw new Error(`Locale-specific URL for '${localeKey}' is missing in test data.`);
    }

    const fullUrl = `${this.baseUrl}${localeUrl}`;
    console.log(`Navigating to URL for locale '${localeKey}': ${fullUrl}`);
    try {
      await this.page.goto(fullUrl, { waitUntil: 'domcontentloaded' });
    } catch (error) {
      console.error(`Failed to navigate to URL: ${fullUrl}`);
      throw error;
    }
  }

  // **English Settings**
  async openEnglishSettings() {
    console.log("Opening settings for English...");
    await this.navigateToLocaleUrl('en-GB');
  }

  // **Français Settings**
  async openFrancaisSettings() {
    console.log("Opening settings for Français...");
    await this.navigateToLocaleUrl('fr-FR');
  }

  // **Cymraeg Settings**
  async openCymraegSettings() {
    console.log("Opening settings for Cymraeg...");
    await this.navigateToLocaleUrl('cy-GB');
  }

  // **Svenska Settings**
  async openSvenskaSettings() {
    console.log("Opening settings for Svenska...");
    await this.navigateToLocaleUrl('sv-SE');
  }

  // **Polski Settings**
  async openPolskiSettings() {
    console.log("Opening settings for Polski...");
    await this.navigateToLocaleUrl('pl-PL');
  }
}

module.exports = SettingsPage;
