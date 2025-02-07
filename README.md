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

