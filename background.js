// This will handle the on/off state of the extension.
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.toggleState !== undefined) {
            // Here you can store the state or do something else
            console.log("Extension state is now: " + (request.toggleState ? "ON" : "OFF"));
        }
    }
);
