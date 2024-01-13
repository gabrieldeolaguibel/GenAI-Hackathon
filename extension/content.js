// This script will handle scanning the website and picking a random word.

// Check if element is in the current viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get all text nodes that are in the viewport
function getAllTextNodes() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    let textNodes = [];

    while (node = walker.nextNode()) {
        if (isInViewport(node.parentElement)) {
            textNodes.push(node);
        }
    }

    return textNodes;
}

// Pick a random word from the text nodes
function pickRandomWord(textNodes) {
    const allText = textNodes.map(node => node.nodeValue.trim()).join(' ');
    const words = allText.split(/\s+/).filter(word => word.length > 0);
    if (words.length === 0) return null;
    return words[Math.floor(Math.random() * words.length)];
}

// Create and display a popup with the chosen word
function createPopup(word) {
    const popup = document.createElement('div');
    popup.textContent = word;
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.left = '20px';
    popup.style.padding = '10px';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid black';
    popup.style.zIndex = 1000;
    document.body.appendChild(popup);

    setTimeout(() => document.body.removeChild(popup), 3000);
}

// Main function to execute the process
function main() {
    const textNodes = getAllTextNodes();
    const randomWord = pickRandomWord(textNodes);
    if (randomWord) {
        createPopup(randomWord);
    }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "pickWord") {
            console.log("Message received. Executing main function.");
            main();
        }
    }
);


// The following code ensures the main function is only executed when a message is received
// Remove these lines if you don't want the extension to execute immediately on page load
/*
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
*/
