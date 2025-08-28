// Popup script for Conventional Comments Badges Extension

class PopupManager {
  constructor() {
    this.init();
  }

  init() {
    this.checkExtensionStatus();
    this.loadSettings();
    this.setupEventListeners();
  }

  async checkExtensionStatus() {
    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    try {
      // Check if we're on a GitHub page
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url && tab.url.includes('github.com')) {
        if (tab.url.includes('/pull/')) {
          statusDot.className = 'status-dot active';
          statusText.textContent = 'Active on Pull Request';
        } else {
          statusDot.className = 'status-dot inactive';
          statusText.textContent = 'Navigate to a Pull Request to use badges';
        }
      } else {
        statusDot.className = 'status-dot inactive';
        statusText.textContent = 'Not on GitHub';
      }
    } catch (error) {
      statusDot.className = 'status-dot inactive';
      statusText.textContent = 'Error checking status';
      console.error('Error checking extension status:', error);
    }
  }

  loadSettings() {
    chrome.storage.sync.get(['autoInsert', 'showPreview'], (result) => {
      const autoInsertCheckbox = document.getElementById('autoInsert');
      const showPreviewCheckbox = document.getElementById('showPreview');
      
      if (autoInsertCheckbox) {
        autoInsertCheckbox.checked = result.autoInsert || false;
      }
      
      if (showPreviewCheckbox) {
        showPreviewCheckbox.checked = result.showPreview !== false; // Default to true
      }
    });
  }

  setupEventListeners() {
    // Settings checkboxes
    const autoInsertCheckbox = document.getElementById('autoInsert');
    const showPreviewCheckbox = document.getElementById('showPreview');

    if (autoInsertCheckbox) {
      autoInsertCheckbox.addEventListener('change', (e) => {
        chrome.storage.sync.set({ autoInsert: e.target.checked });
      });
    }

    if (showPreviewCheckbox) {
      showPreviewCheckbox.addEventListener('change', (e) => {
        chrome.storage.sync.set({ showPreview: e.target.checked });
      });
    }

    // Quick shield buttons
    const quickShieldButtons = document.querySelectorAll('.quick-shield');
    quickShieldButtons.forEach(button => {
      button.addEventListener('click', () => {
        const shieldType = button.dataset.type;
        this.insertQuickShield(shieldType);
      });
    });
  }

  async insertQuickShield(shieldType) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (tab.url && tab.url.includes('github.com') && tab.url.includes('/pull/')) {
        // Send message to content script to insert quick shield
        chrome.tabs.sendMessage(tab.id, {
          action: 'insertQuickShield',
          shieldType: shieldType
        });
        
        // Close popup after a short delay
        setTimeout(() => {
          window.close();
        }, 100);
              } else {
          alert('Please navigate to a GitHub Pull Request to use this feature.');
        }
      } catch (error) {
        console.error('Error inserting quick shield:', error);
        alert('Error inserting shield. Please try again.');
      }
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PopupManager();
});
