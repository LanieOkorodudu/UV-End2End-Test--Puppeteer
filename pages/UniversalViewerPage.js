const testData = require('../utils/testdata.json');

class UniversalViewerPage {
    constructor(page) {
        this.page = page;

        // Maximize browser window
        //this.page.browser().newPage();
        this.page.setViewport({ width: 1920, height: 1080 }); // Ensures fullscreen

        // Locators
        this.previousImageButton = '[title="Previous Image"]';
        this.nextImageButton = '[title="Next Image"]';
        this.zoomInButton = '[title="Zoom In"]';
        this.zoomOutButton = '[title="Zoom Out"]';
        this.rotateRightButton = '[title="Rotate Right"]';
        this.adjustImageButton = '[title="Adjust image"]';
        this.adjustCloseButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[10]/div[2]/div[2]/button[2]';
        this.singlePageViewButton = '[title="Single page view"]';
        this.twoPageViewButton = '[title="Two page view"]';
        this.galleryButton = '[title="Gallery"]';
        this.searchWithinTextbox = '#searchWithinInput';
        this.okButton = '[title="Search within this item"]';
        this.downloadButton = '[title="Download"]';
        this.shareButton = '[title="Share"]';
        this.embedLink = 'xpath=//*[@id="uv"]/div/div/div[5]/div[9]/div[2]/div[1]/div[1]/a[2]';
        this.fullScreenButton = '[title="Full Screen"]';
        this.exitFullScreenButton = '[title="Exit Full Screen"]';
        this.downloadCloseButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[11]/div/div[2]/div[2]/button';
        this.embedCloseButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[9]/div[2]/div[2]/button'
        this.thumbnailsButton = 'xpath=//*[@id="uv"]/div/div/div[2]/div[2]/div[3]/div[1]/a[2]';
        this.indexButton = 'xpath=//*[@id="uv"]/div/div/div[2]/div[2]/div[3]/div[1]/a[1]';
        this.searchPageTextbox = 'xpath=//*[@id="uv"]/div/div/div[1]/div[1]/div[1]/div[3]/input[2]';
        this.sliderMinusButton = 'xpath=//*[@id="uv"]/div/div/div[2]/div[2]/div[3]/div[2]/div[2]/div[3]/div/div[1]/div[1]/input[1]';
        this.sliderPlusButton = 'xpath=//*[@id="uv"]/div/div/div[2]/div[2]/div[3]/div[2]/div[2]/div[3]/div/div[1]/div[1]/input[3]';
        this.okBoxButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[1]/div[2]/div[2]/button[2]';
    } 

        //Hover Function
    async hoverOverElement(selector) {
        try {
            await this.page.waitForSelector(selector, { visible: true, timeout: 6000 });
            await this.page.hover(selector);
            await this.page.waitForTimeout(200); // Allow time for UI changes
        } catch (error) {
            console.warn(`Warning: Element ${selector} not found for hover`);
        }
    }
    

    // Generic function to safely click an element
    async safeClick(selector) {
        try {
            await this.page.waitForSelector(selector, { visible: true, timeout: 6000 });
            await this.hoverOverElement(selector); // Ensure it's visible
            await this.page.click(selector);
            await this.page.waitForTimeout(200); // Small delay for stability
        } catch (error) {
            console.warn(`Warning: Element ${selector} not found or not clickable`);
        }
    }
    

    async navigateToInitialUrl() {
        await this.page.goto(testData.initialUrl, { waitUntil: 'networkidle2' });
    }

    async navigateImages() {
        await this.page.waitForSelector(this.nextImageButton, { visible: true });
        await this.safeClick(this.nextImageButton);
        await this.page.waitForSelector(this.previousImageButton, { visible: true });
        await this.safeClick(this.previousImageButton);
    }

    async zoomControls() {
        await this.page.waitForSelector(this.zoomInButton, { visible: true });
        await this.safeClick(this.zoomInButton);
        await this.page.waitForSelector(this.zoomOutButton, { visible: true });
        await this.safeClick(this.zoomOutButton);
    }

    async rotateImage(times = 1) {
        for (let i = 0; i < times; i++) {
            await this.page.waitForSelector(this.rotateRightButton, { visible: true });
            await this.safeClick(this.rotateRightButton);
        }
    }

    async adjustImageAndClose() {
        await this.page.waitForSelector(this.adjustImageButton, { visible: true });
        await this.safeClick(this.adjustImageButton);
        await this.page.waitForSelector(this.adjustCloseButton, { visible: true });
        await this.safeClick(this.adjustCloseButton);
    }

    async openThumbnailsAndIndex() {
        await this.safeClick(this.thumbnailsButton);
        await this.safeClick(this.indexButton);
    }

    async searchByPageNumber() {
        console.log("Entering page number...");
    
        // Wait for the input field
        await this.page.waitForSelector(this.searchPageTextbox, { visible: true, timeout: 10000 });
    
        // Click & clear existing text
        await this.page.click(this.searchPageTextbox, { clickCount: 3 });
        await this.page.keyboard.press('Backspace');
    
        // Type the page number & press Enter
        await this.page.type(this.searchPageTextbox, testData.pageNumber, { delay: 100 });
        await this.page.keyboard.press('Enter');
    
        // Take a screenshot for debugging (uncomment the code if needed for debugging)
       // await this.page.screenshot({ path: 'searchNumber.png' });
    }
    
    
    async viewModes() {
        await this.page.waitForSelector(this.singlePageViewButton, { visible: true });
        await this.safeClick(this.singlePageViewButton);
        await this.page.waitForSelector(this.twoPageViewButton, { visible: true });
        await this.safeClick(this.twoPageViewButton);
        await this.page.waitForSelector(this.galleryButton, { visible: true });
        await this.safeClick(this.galleryButton);
    }

    async searchWithinItem() {
        console.log("🟢 Entering search keyword...");
    
        // Type the search keyword & press Enter
        await this.page.type(this.searchWithinTextbox, testData.searchKeyword, { delay: 100 });
        await this.page.keyboard.press('Enter');
    
        console.log("⏳ Waiting for possible 'No matches were found' popup...");
    
        // Wait for the OK button if the "No matches were found" popup appears
        const okBoxButton = 'xpath=//*[@id="uv"]/div/div/div[5]/div[1]/div[2]/div[2]/button[2]';  
        const popupExists = await this.page.waitForSelector(okBoxButton, { visible: true, timeout: 5000 }).catch(() => null);
    
        if (popupExists) {
            console.log("⚠ No search results found. Closing popup...");
    
            // ✅ Click the "OK" button
            await this.page.click(okBoxButton);
    
            console.log("Popup closed.");
        } else {
            console.log("Search completed. Results found.");
        }
    
        // Take a screenshot for debugging (uncomment the code if needed for debugging)
       // await this.page.screenshot({ path: 'searchitem.png' });
    
        console.log(`Search for "${testData.searchKeyword}" completed.`);
    }
    
    
    async downloadImages() {
        console.log("Clicking the Download button...");
    
        // Wait for the Download button
        await this.page.waitForSelector(this.downloadButton, { visible: true, timeout: 15000 });
    
        // Click the Download button
        await this.page.click(this.downloadButton);
    
        console.log("⏳ Waiting for the Download modal to open...");
    
        // Wait for the Close button to confirm modal is open
        await this.page.waitForSelector(this.downloadCloseButton, { visible: true, timeout: 15000 });
    
        console.log("Download modal is open!");
    
        // Take a screenshot for debugging (uncomment the code if needed for debugging)
        //await this.page.screenshot({ path: 'download.png' });
    
        // Click the Close button
        console.log("Clicking the Close button...");
        await this.page.click(this.downloadCloseButton);
    
        console.log("Download modal closed.");
    }
    
    
    

    async shareEmbedLink() {
        try {
            const overlay = await this.page.$('.overlays');
            if (overlay) {
                await this.page.waitForSelector('.overlays', { hidden: true, timeout: 30000 });
            }
            await this.page.waitForSelector(this.shareButton, { visible: true });
            await this.safeClick(this.shareButton);
            await this.page.waitForSelector(this.embedLink, { visible: true });
            await this.safeClick(this.embedLink);
            await this.page.waitForSelector(this.embedCloseButton, { visible: true });
            await this.safeClick(this.embedCloseButton);
        } catch (error) {
            console.error('Error in shareEmbedLink:', error);
        }
    }

    async adjustSlider() {
        await this.page.waitForSelector(this.galleryButton, { visible: true, timeout: 10000 });
        await this.safeClick(this.galleryButton);
    
        await this.page.waitForSelector(this.thumbnailsButton, { visible: true, timeout: 10000 });
        await this.safeClick(this.thumbnailsButton);
    
        // Ensure the slider is visible and interactable
        await this.page.waitForSelector(this.sliderMinusButton, { visible: true, timeout: 10000 });
        await this.safeClick(this.sliderMinusButton);
    
        await this.page.waitForSelector(this.sliderPlusButton, { visible: true, timeout: 10000 });
        await this.safeClick(this.sliderPlusButton);
    }
    

    async toggleFullScreen() {
        await this.page.waitForSelector(this.fullScreenButton, { visible: true });
        await this.safeClick(this.fullScreenButton);
        await this.page.waitForSelector(this.exitFullScreenButton, { visible: true });
        await this.safeClick(this.exitFullScreenButton);
    }
}

module.exports = UniversalViewerPage;
