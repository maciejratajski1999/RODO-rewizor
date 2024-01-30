var requestURLs = [];

browser.webRequest.onCompleted.addListener(
    (details) => {
        requestURLs.push(details.url);
    },
    {urls: ["<all_urls>"]}
);

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === "getRequests") {
        sendResponse(requestURLs);
        requestURLs = []; // reset the list after sending
    }
});
