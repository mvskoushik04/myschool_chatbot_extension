// Content script to interact with web pages
console.log('Chatbot content script loaded')

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === 'getPageContent') {
    const pageData = {
      title: document.title,
      url: window.location.href,
      selectedText: window.getSelection()?.toString() || '',
      pageContent: document.body.innerText.substring(0, 2000)
    }
    sendResponse(pageData)
  }
})