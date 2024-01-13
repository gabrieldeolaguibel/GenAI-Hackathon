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

// Function to show quiz popup
function showQuizPopup(chosenWord, quizOptions) {
    // Create the quiz container
    const quizContainer = document.createElement('div');
    quizContainer.id = 'quiz-popup';
    quizContainer.style.position = 'fixed';
    quizContainer.style.bottom = '10px';
    quizContainer.style.right = '10px';
    quizContainer.style.padding = '20px';
    quizContainer.style.backgroundColor = 'white';
    quizContainer.style.border = '1px solid black';
    quizContainer.style.zIndex = '10000';
    quizContainer.style.width = '300px';

    // Quiz content
    const content = `
        <h2>Learn a new word from your current page!</h2>
        <p>What is "${chosenWord}" translated to in Spanish?</p>
        <ul style="list-style-type: none; padding: 0;">
            <li>A. ${quizOptions.option1}</li>
            <li>B. ${quizOptions.option2}</li>
            <li>C. ${quizOptions.option3}</li>
            <li>D. ${quizOptions.option4}</li>
        </ul>
    `;

    // Add content to quiz container
    quizContainer.innerHTML = content;

    // Append quiz container to the body
    document.body.appendChild(quizContainer);
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
        // Parse quiz options JSON string
        const quizOptions = JSON.parse(data.quizOptions);

        // Show quiz popup
        showQuizPopup(data.chosenWord, quizOptions);

        // Log data to console for debugging
        console.log('Chosen Word:', data.chosenWord);
        console.log('Quiz Options:', data.quizOptions);
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
