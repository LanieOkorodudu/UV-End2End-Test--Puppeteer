# Universal Viewer Automation Framework (Puppeteer + Jest)
This project is an automated testing framework for Universal Viewer, built using **Puppeteer** and **Jest**. The framework follows the **Page Object Model (POM)** structure, ensuring maintainability, scalability, and reusability.

**Features**
  * Page Object Model (POM) architecture
  * Headless & non-headless execution
  * Multi-locale support for UI testing
  * Automated UI interactions (zoom, rotate, search, etc.)
  * Screenshot capturing for debugging
  * Jest for test execution & assertions
  * Test coverage reporting
  * Custom Jest reporters for detailed test reports

  **Features Tested**  
    📌 **Universal Viewer Functionalities**(`UniversalViewerPage`)    
  * Navigation between images (`next` and `previous` button)    
  * Zoom in and Zoom out functionality   
  * Image rotation(clockwise rotation)   
  * Adjust image settings and close settings    
  * View modes (Single Page, Two Page, and Gallery View)    
  * Search within item functionality (negative testing-validation for no results pop up)    
  * Search by entering a page number    
  * Open & close thumbnails and index panel    
  * Download image modal opens & closes correctly    
  * Share & Embed functionality validation   
  * Slider adjustment for navigation    
  * Full-screen mode toggle

  🌎 **Locale Change    Functionalities** (`SettingsPage.js`)    
  * Navigate to English locale (en-GB)    
  * Navigate to French locale (fr-FR)    
  * Navigate to Welsh locale (cy-GB)    
  * Navigate to Swedish locale (sv-SE)    
  * Navigate to Polish locale (pl-PL)    
  * Validate correct URLs for different locales

  ⚙ **Settings Page Functionalities**(`SettingsButtonPage.js`)    
  * Open & Close the settings panel    
  * Enable/Disable Reduced Animation    
  * Enable/Disable Navigator  
  * Enable/Disable Two Page View    
  * Enable/Disable Truncate Thumbnail Labels    
  * Enable/Disable Mouse Click to Zoom    
  * Enable/Disable Preserve Zoom on Navigation   
  * Open & validate More Info link in a new tab 

 **Installation and Setup**   
  Make sure you have the following installed:  
  * `Node.js (LTS version)`  
  * `npm` (comes with node.js)

  **Clone the Repository**  
    `git clone <repo-url> cd <project-folder>`

  **Install Dependencies**   
  * Install puppeteer: 
     `npm i puppeteer`: Download compatible Chrome during installation  
  * Install Jest:  
      `npm install jest --save-dev`  
  * Install Jest HTML Reporter (For Test Reports)  
      `npm install jest-html-reporter --save-dev`

  **Running Test**  
  * Run all the test: `npm test`  
  * Run a specific test file: `npx jest tests/universalViewer.test.js`  
  * Generate HTML test reports: `npm test`  
  * Runs Jest in verbose mode: `npx jest --verbose`  
      It will display detailed logs of every test, including:
      * Test file execution order
      * Individual test names & results
      * Assertions that passed or failed
      * Execution time per test
  * Run a single test file with detailed output:  
    `npx jest tests/universalViewer.test.js --verbose`  

  **Summary of Key Folders**
  | **Folder**	      |       **Purpose**    |
  |-------------------|----------------------|
  |utils/	            |      Stores configuration (RC-URLs, Search keywords &  search numbers for test cases, and Change Locale ).This file allows easy updates without modifying test scripts.  |
  |pages/	            |      Page Object Model (POM) which define reusable test methods. If a new feature is added to Universal Viewer, create a new method inside the respective pages/ class.  |
  |tests/	            |       Jest test cases for verifying UI functionality. Test coverage expands with new features. You can create new test suites in tests/ to cover additional scenarios.  |
  |screenshots/	      |       Stores failure screenshots for debugging  |


  **Contributors**  
  Lanie Okorodudu  
  Senior Test Engineer  
  Universal Viewer (BL)













  