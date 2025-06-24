// Background script for handling extension events
chrome.runtime.onInstalled.addListener(() => {
    console.log('Chatbot extension installed')
  })
  
  // Handle messages from content script or popup
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'getPageData') {
      // Handle page data requests
      sendResponse({ success: true })
    }
  })  