const testData = require('../utils/testdata.json');

class SettingsPage {
    constructor(page) {
        this.page = page;
        this.baseUrl = testData.initialUrl;
        this.localeOptions = testData.localeOptions;

        // Maximize the browser window
        this.page.setViewport({ width: 1920, height: 1080 });

        // Locators
        this.settingsButton = '[title="Settings"]'; 
        this.settingsPopup = 'xpath=//*[@id="uv"]/div/div/div[5]/div[12]/div[2]/div[1]/div[1]';   // The pop-up that appears
        this.reducedAnimationCheckbox = '[id="reducedAnimation"]';
        this.navigatorEnabledCheckbox = '[id="navigatorEnabled"]';
        this.twoPageViewCheckbox = '[id="pagingEnabled"]';
        this.truncateThumbnailLabelsCheckbox = '[id="truncateThumbnailLabels"]';
        this.mouseClickToZoomCheckbox = '[id="clickToZoomEnabled"]';
        this.preserveZoomCheckbox = '[id="preserveViewport"]';
        this.moreInfoLink = 'xpath=//*[@id="uv"]/div/div/div[5]/div[12]/div[2]/div[1]/div[4]/a';
        this.closeSettingsButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[12]/div[2]/div[2]/button'; // Close button inside the pop-up
    }

    /**
     * Navigate to the Universal Viewer and wait for it to fully load.
     */
    async navigateToInitialUrl() {
        console.log('Navigating to Universal Viewer...');
        await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
        console.log('Page loaded successfully.');
    }

    /**
     * Open the settings pop-up by clicking the settings button.
     */
    async openSettings() {
        console.log('Opening settings...');
        await this.page.waitForSelector(this.settingsButton, { visible: true, timeout: 8000 });
        await this.page.click(this.settingsButton);
        await this.page.waitForSelector(this.settingsPopup, { visible: true, timeout: 5000 });
        console.log('Settings pop-up is now open.');
    }

    /**
     * Close the settings pop-up.
     */
    async closeSettings() {
        console.log('Closing settings pop-up...');
        await this.page.waitForSelector(this.closeSettingsButton, { visible: true });
        await this.page.click(this.closeSettingsButton);
        await this.page.waitForSelector(this.settingsPopup, { hidden: true });
        console.log('Settings pop-up closed.');
    }

    /**
     * Toggle a checkbox (check or uncheck).
     * @param {string} selector - The checkbox selector.
     * @param {string} state - 'check' or 'uncheck'.
     */
    async toggleCheckbox(selector, state) {
        console.log(`Toggling checkbox: ${selector} to ${state}`);
        await this.page.waitForSelector(selector, { visible: true, timeout: 5000 });

        const isChecked = await this.page.$eval(selector, el => el.checked);
        if ((state === 'check' && !isChecked) || (state === 'uncheck' && isChecked)) {
            await this.page.click(selector);
            console.log(`Checkbox ${selector} is now ${state}ed.`);
        } else {
            console.log(`Checkbox ${selector} was already in the desired state.`);
        }
    }

    /**
     * Methods to toggle each checkbox.
     */
    async toggleReducedAnimation(state) {
        await this.toggleCheckbox(this.reducedAnimationCheckbox, state);
    }

    async toggleNavigatorEnabled(state) {
        await this.toggleCheckbox(this.navigatorEnabledCheckbox, state);
    }

    async toggleTwoPageView(state) {
        await this.toggleCheckbox(this.twoPageViewCheckbox, state);
    }

    async toggleTruncateThumbnailLabels(state) {
        await this.toggleCheckbox(this.truncateThumbnailLabelsCheckbox, state);
    }

    async toggleMouseClickToZoom(state) {
        await this.toggleCheckbox(this.mouseClickToZoomCheckbox, state);
    }

    async togglePreserveZoom(state) {
        await this.toggleCheckbox(this.preserveZoomCheckbox, state);
    }

    /**
     * Open "More Info" link in a new tab.
     */
    async openMoreInfo() {
        console.log('Opening "More Info" link...');
        const newPagePromise = new Promise(resolve => this.page.once('popup', resolve));
        await this.page.click(this.moreInfoLink);
        const newPage = await newPagePromise;

        if (newPage) {
            console.log('Popup opened successfully. Closing it now...');
            await newPage.close();
            console.log('Popup closed.');
        } else {
            throw new Error('The popup for "More Info" did not open.');
        }
    }
}

module.exports = SettingsPage;
