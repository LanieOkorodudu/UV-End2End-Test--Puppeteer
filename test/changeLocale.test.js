const puppeteer = require('puppeteer');
const SettingsPage = require('../pages/ChangeLocale');
const testData = require('../utils/testdata.json');

describe('Settings Page Tests', () => {
    let browser, page, settingsPage;

    // Setup before running tests
    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false }); // Set to true in CI environments
        page = await browser.newPage();
        settingsPage = new SettingsPage(page);

        console.log('Navigating to the base URL...');
        await page.goto(testData.initialUrl, { waitUntil: 'domcontentloaded' });
    });

    // Cleanup after all tests
    afterAll(async () => {
        await browser.close();
    });

    // Test navigating to English settings
    test('Navigate to English Settings', async () => {
        console.log('Testing English Settings...');
        await settingsPage.openEnglishSettings();

        const expectedUrl = `${testData.initialUrl}${testData.localeOptions['en-GB'].ENurl}`;
        expect(page.url()).toBe(expectedUrl);
    });

    // Test navigating to French settings
    test('Navigate to French Settings', async () => {
        console.log('Testing French Settings...');
        await settingsPage.openFrancaisSettings();

        const expectedUrl = `${testData.initialUrl}${testData.localeOptions['fr-FR'].FRurl}`;
        expect(page.url()).toBe(expectedUrl);
    });

    // Test navigating to Welsh settings
    test('Navigate to Cymraeg Settings', async () => {
        console.log('Testing Cymraeg Settings...');
        await settingsPage.openCymraegSettings();

        const expectedUrl = `${testData.initialUrl}${testData.localeOptions['cy-GB'].GBurl}`;
        expect(page.url()).toBe(expectedUrl);
    });

    // Test navigating to Swedish settings
    test('Navigate to Svenska Settings', async () => {
        console.log('Testing Svenska Settings...');
        await settingsPage.openSvenskaSettings();

        const expectedUrl = `${testData.initialUrl}${testData.localeOptions['sv-SE'].SEurl}`;
        expect(page.url()).toBe(expectedUrl);
    });

    // Test navigating to Polish settings
    test('Navigate to Polski Settings', async () => {
        console.log('Testing Polski Settings...');
        await settingsPage.openPolskiSettings();

        const expectedUrl = `${testData.initialUrl}${testData.localeOptions['pl-PL'].PLurl}`;
        expect(page.url()).toBe(expectedUrl);
    });

    // Dynamic test for all locales
    //test('Navigate to all locale-specific URLs dynamically', async () => {
     //   console.log('Testing dynamic navigation for all locales...');
        
      //  const locales = Object.keys(testData.localeOptions);
       // for (const locale of locales) {
       //     console.log(Testing locale: ${locale});
         //   await settingsPage.navigateToLocaleUrl(locale);

          //  const expectedUrl = ${testData.initialUrl}${testData.localeOptions[locale].url};
       //     expect(page.url()).toBe(expectedUrl);
      //  }
   // });
});
