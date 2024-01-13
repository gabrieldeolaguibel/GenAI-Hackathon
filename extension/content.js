// This script will handle scanning the website and sending text to the Flask server.

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

// Function to send text to the server and handle response
function sendTextToServer(text) {
    fetch('http://127.0.0.1:5000/process_text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Chosen Word:', data.selectedWord);
        // Additional actions based on the chosen word
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Main function to execute the process
function main() {
    const visibleText = getAllTextInViewPort();
    sendTextToServer(visibleText);
}

// Immediately execute main when script is injected
main();
