chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.webNavigation.onCompleted.addListener(details => {
  if (details.url.includes('discord.com')) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['discord.js']
    });
  } else if (details.url.includes('roblox.com')) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ['roblox.js']
    });
  }
});
