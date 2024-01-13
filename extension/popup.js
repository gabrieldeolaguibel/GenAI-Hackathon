document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle-extension');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            // Only inject the content script when the toggle is switched on
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                if (!tabs[0].url.startsWith('chrome://')) {
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        files: ['content.js']
                    });
                } else {
                    console.log("Cannot execute script on chrome:// pages");
                }
            });
        }
    });
});
