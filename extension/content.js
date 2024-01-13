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
function getAllTextInViewPort() {
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );

    let node;
    let visibleText = [];
    let wordCount = 0;
    const maxWordCount = 200;

    while (node = walker.nextNode()) {
        if (isInViewport(node.parentElement) && wordCount < maxWordCount) {
            let text = node.nodeValue.trim();
            let words = text.split(/\s+/)
                .filter(word => /^[a-zA-Z]+$/.test(word) && word.length >= 3);

            for (let word of words) {
                if (wordCount >= maxWordCount) {
                    break;
                }
                visibleText.push(word);
                wordCount++;
            }
        }
    }

    return visibleText.join(' ');
}


// Create and display a popup with the visible text
function createPopup(text) {
    const popup = document.createElement('div');
    popup.textContent = text;
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'lightblue';
    popup.style.color = 'black';
    popup.style.border = '2px solid black';
    popup.style.zIndex = '10000';
    popup.style.fontSize = '16px';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';
    popup.style.maxHeight = '80vh';
    popup.style.overflowY = 'auto';
    popup.style.width = '80%';
    popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';

    document.body.appendChild(popup);

    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 10000); // Increased timeout for longer text
}


// Main function to execute the process
function main() {
    const visibleText = getAllTextInViewPort();
    createPopup(visibleText);
}

// Immediately execute main when script is injected
main();
