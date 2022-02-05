const envDef = {
  /** server private key for all services */
  SERVER_PRIVATE_KEY: null,

  /** Google Service account secrets for firebase admin sdk */
  GOOGLE_SERVICE_ACCT_EMAIL: null,
  GOOGLE_SERVICE_ACCT_PK: null,

  /** Public Environment Variables */
  /** firebase configuration */
  NEXT_PUBLIC_FIREBASE_PROJ_ID: null,
  NEXT_PUBLIC_FIREBASE_STORAGE: null,
  NEXT_PUBLIC_FIREBASE_APIKEY: null,
  NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: null,
  NEXT_PUBLIC_FIREBASE_MESSAGINGSENDER: null,
  NEXT_PUBLIC_FIREBASE_APPID: null,
  NEXT_PUBLIC_FIREBASE_MEASUREMENTID: null,
};

module.exports = envDef;
