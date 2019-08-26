export default {
  appName: 'Beautiful Wallpapers in 2k and 4k',
  appPackageName: 'com.dnsndrvsk.wallpiesuperheroes',
  appFilesPrefix: 'Beautiful_Wallpaper',
  cloudinary: {
    domain: 'https://res.cloudinary.com',
    username: 'dkgyur1is',
    images: {
      source: 'image/upload/v1557825328',
      preview: 'image/upload/w_600,c_scale',
    },
  },
  firebase: {
    databaseURL: 'https://wallpiesuperheroes.firebaseio.com/',
    projectId: 'wallpiesuperheroes',
    apiKey: 'AIzaSyCrriaXM1HXr82mTLY-7BV0GOpZ46Rwy0A',
  },
  ads: {
    test: {
      banner: 'ca-app-pub-3940256099942544/6300978111',
      interstitial: 'ca-app-pub-3940256099942544/1033173712',
    },
    banner: 'ca-app-pub-8141953641999538/4761011201',
    interstitials: [
      'ca-app-pub-8141953641999538/6076471617',
      'ca-app-pub-8141953641999538/3990908918',
      'ca-app-pub-8141953641999538/8125541145',
    ],
  },
  popupShowRates: {
    interstitialAd: 5,
    rateUs: 13,
  },
  adMobAppId: 'ca-app-pub-8141953641999538~2757718296',
};
