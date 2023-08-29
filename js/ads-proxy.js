(function (window) {
    {
        var unknown = '';
        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Chrome OS', r:/CrOS/},
            {s:'Linux', r:/(Linux|X11(?!.*CrOS))/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS':
            case 'Mac OS X':
            case 'Android':
                osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
    }
    function randomString() {
      const length = 32;
      const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
    }

    window.jscd = {
        os: os.toLowerCase().replace(/\s+/g, ''),
        osVersion: osVersion.toLowerCase().replace(/\s+/g, ''),
        uid: randomString()
    };
  }(this));

  fetch(`https://beegrenugoz.com/5/6091934/?oo=1&js_build=iclick-v1.588.0&os=${jscd.os}&os_version=${jscd.osVersion}`)
  .then(response => response.json())
  .then(data => {
    var oaid = '';
    var ruid = '';
    fetch(`https://my.rtmark.net/gid.js?userId=${data.oaid}`)
    .then(trash => {
      oaid = data.oaid;
      ruid = data.ruid;
      fetch(`https:${data.url}&js_build=iclick-v1.588.0&fs=0&cf=0&sw=1920&sh=1080&sah=1045&wx=0&wy=35&ww=1920&wh=1045&cw=1046&wih=970&wiw=1046&wfc=0&pl=https%3A%2F%2Feyeballer.dev%2Fads-popunder&drf=&np=1&pt=0&nb=1&ng=1&ix=0&nw=1&tb=false&js_build=iclick-v1.588.0&bs=${ruid}&userId=${oaid}&os=${jscd.os}&os_version=${jscd.osVersion}&m=link`)
      .then(adsResponse => adsResponse.json())
      .then(adsData => {
        fetch(`${adsData.catUrl}`, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=UTF-8",
          },
          body: JSON.stringify({"bannerId":adsData.bannerId,"campaignId":adsData.campaignId,"requestImpression":adsData.requestImpression,"tries":1})
        })
      })
    })
    .catch((error) => {
      fetch(`https://my.rtmark.net/gid.js?userId=${jscd.uid}`)
      .then(trash => {
        oaid = jscd.uid;
        fetch(`https:${data.url}&js_build=iclick-v1.588.0&fs=0&cf=0&sw=1920&sh=1080&sah=1045&wx=0&wy=35&ww=1920&wh=1045&cw=1046&wih=970&wiw=1046&wfc=0&pl=https%3A%2F%2Feyeballer.dev%2Fads-popunder&drf=&np=1&pt=0&nb=1&ng=1&ix=0&nw=1&tb=false&js_build=iclick-v1.588.0&bs=${ruid}&userId=${oaid}&os=${jscd.os}&os_version=${jscd.osVersion}&m=link`)
        .then(adsResponse => adsResponse.json())
        .then(adsData => {
          fetch(`${adsData.catUrl}`, {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=UTF-8",
            },
            body: JSON.stringify({"bannerId":adsData.bannerId,"campaignId":adsData.campaignId,"requestImpression":adsData.requestImpression,"tries":1})
          })
        })
      })
    })
  })