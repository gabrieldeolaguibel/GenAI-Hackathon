// create and link in popup.html
document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle-extension');

    toggle.addEventListener('change', function() {
        if (toggle.checked) {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: pickAndShowWord
                });
            });
        }
    });
});

function pickAndShowWord() {
    // We will send a message to the content script
    chrome.runtime.sendMessage({action: "pickWord"});
}

