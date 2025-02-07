const puppeteer = require('puppeteer');
const SettingsPage = require('../pages/SettingsButton');

describe('Settings Tests', () => {
    let browser;
    let page;
    let settingsPage;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
        page = await browser.newPage();
        settingsPage = new SettingsPage(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Check and uncheck checkboxes', async () => {
        await settingsPage.navigateToInitialUrl();
        await settingsPage.openSettings();
        
        await settingsPage.toggleReducedAnimation('check');
        await settingsPage.toggleNavigatorEnabled('uncheck');
        await settingsPage.toggleTwoPageView('check');
        await settingsPage.toggleTruncateThumbnailLabels('check');
        await settingsPage.toggleMouseClickToZoom('uncheck');
        await settingsPage.togglePreserveZoom('check');

        await settingsPage.closeSettings();
    });

    test('Open "More Info" popup', async () => {
        await settingsPage.navigateToInitialUrl();
        await settingsPage.openSettings();
        await settingsPage.openMoreInfo();
        await settingsPage.closeSettings();
    });
});

