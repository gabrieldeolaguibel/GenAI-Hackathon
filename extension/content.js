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
    console.log("Creating popup with word: ", word);
    const popup = document.createElement('div');
    popup.textContent = `Selected word: ${word}`;
    popup.style.position = 'fixed';
    popup.style.top = '50%';   // Center vertically
    popup.style.left = '50%';  // Center horizontally
    popup.style.transform = 'translate(-50%, -50%)'; // Adjust for centering
    popup.style.padding = '20px';
    popup.style.backgroundColor = 'lightblue';  // Change for visibility
    popup.style.color = 'black';
    popup.style.border = '2px solid black';
    popup.style.zIndex = '10000';   // Ensure it's on top
    popup.style.fontSize = '20px';  // Make text larger
    popup.style.borderRadius = '10px'; // Rounded corners for aesthetics
    popup.style.textAlign = 'center';
    popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)'; // Add shadow for better visibility

    document.body.appendChild(popup);

    // Remove the popup after 3 seconds
    setTimeout(() => {
        if (popup.parentNode) {
            popup.parentNode.removeChild(popup);
        }
    }, 3000);
}


// Main function to execute the process
function main() {
    console.log("Executing main function in content.js");
    const textNodes = getAllTextNodes();
    console.log("Text nodes found: ", textNodes.length);
    const randomWord = pickRandomWord(textNodes);
    console.log("Random word picked: ", randomWord);
    if (randomWord) {
        createPopup(randomWord);
    } else {
        console.log("No word found to display in popup");
    }
}

// Immediately execute main when script is injected
main();
