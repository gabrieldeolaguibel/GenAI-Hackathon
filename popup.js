// create and link in popup.html
document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.getElementById('toggle-extension');

    // On toggle change, send a message to background.js
    toggle.addEventListener('change', function() {
        chrome.runtime.sendMessage({toggleState: toggle.checked});
    });
});
