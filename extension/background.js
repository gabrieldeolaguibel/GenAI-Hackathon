// Handles the on/off switch state of the extension.


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toggleState !== undefined) {
            // Save the state of the extension
            console.log("Extension state is now: " + (request.toggleState ? "ON" : "OFF"));
        }
    }
);
