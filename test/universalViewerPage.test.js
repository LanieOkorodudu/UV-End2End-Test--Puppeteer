const puppeteer = require('puppeteer');
const UniversalViewerPage = require('../pages/UniversalViewerPage'); // Import your POM
const testData = require('../utils/testdata.json');

jest.setTimeout(20000); // Increase timeout globally to 20 seconds

describe('Universal Viewer Automated Test', () => {
    let browser;
    let page;
    let viewer;

    beforeAll(async () => {
        // Fix: Correctly assign `browser`
        browser = await puppeteer.launch({
            headless: false, // Open browser for debugging
            args: ['--start-maximized'] // Maximize window
        });

        page = await browser.newPage();
        viewer = new UniversalViewerPage(page);

        // Navigate to the application
        await viewer.navigateToInitialUrl();
    });

    afterAll(async () => {
        if (browser) { // Fix: Only close if `browser` exists
            await browser.close();
        }
    });

    test('Navigate through images', async () => {
        await viewer.navigateImages();
    });

    test('Test zoom controls', async () => {
        await viewer.zoomControls();
    });

    test('Rotate the image', async () => {
        await viewer.rotateImage(2); // Rotate twice
    });

    test('Adjust image and close', async () => {
        await viewer.adjustImageAndClose();
    });

    test('Open thumbnails and index', async () => {
        await viewer.openThumbnailsAndIndex();
    });

    test('Search by page number', async () => {
        await viewer.searchByPageNumber();
    }, 15000);  // Fix: Increase timeout to 15s

    test('Switch between view modes', async () => {
        await viewer.viewModes();
    });

    test('Search within the item', async () => {
        await viewer.searchWithinItem();
    }, 15000);

    test('Download images', async () => {
        await viewer.downloadImages();
    }, 15000);

    test('Share and close embed link', async () => {
        await viewer.shareEmbedLink();
    });

    test('Adjust slider', async () => {
        await viewer.adjustSlider();
    });

    test('Toggle full-screen mode', async () => {
        await viewer.toggleFullScreen();
    });
});
