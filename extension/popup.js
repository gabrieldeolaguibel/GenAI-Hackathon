document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle-extension');

    toggle.addEventListener('change', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // Check if the tab's URL is not a Chrome internal page
            if (!tabs[0].url.startsWith('chrome://')) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: pickAndShowWord
                });
            } else {
                // Handle the case when the user is on a Chrome internal page
                console.log("Cannot execute script on chrome:// pages");
            }
        });
    });
});

function pickAndShowWord() {
    console.log("Sending message to content script");
    chrome.runtime.sendMessage({action: "pickWord"});
}

