// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// export const environment = {
//   production: false,
//   assetUrl: "http://localhost:4200/assets/",
//   baseUrl: "http://127.0.0.1:8000/",
//   portalUrl: "http://localhost:4200/#/",
//   reCaptchaSiteKey: "6Lcw0lwaAAAAAFqNAEkV3dYsUewndOU2Uzx8SW3S",
//   reCaptchaSecretKey: "6Lcw0lwaAAAAAP-5dBKk8w-qL2RzyvfM2KSI_w1q",
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export const environment = {
  production: true,
  assetUrl: "https://www.planetariumnegara.gov.my/assets/",
  baseUrl: "https://api.planetariumnegara.gov.my/",
  portalUrl: "https://www.planetariumnegara.gov.my/#/",
  
  //OLD KEY (EXPIRED)
  //reCaptchaSiteKey: "6Lcw0lwaAAAAAFqNAEkV3dYsUewndOU2Uzx8SW3S",
  //reCaptchaSecretKey: "6Lcw0lwaAAAAAP-5dBKk8w-qL2RzyvfM2KSI_w1q",

  //RAZIMAN KEY (TEMP)
  reCaptchaSiteKey: "6LcmW2UaAAAAAN8l9okEsS0f3QZbyn0ch52Y1qg1",
  reCaptchaSecretKey: "6LcmW2UaAAAAAHGM0xB2TYAXd6nloMYH2h01LVIM",
};