import admin from "firebase-admin";

/**
 * Initializes the firebase admin sdk application.
 * @returns the firebase admin app.
 */
export default function init(): admin.app.App {
  try {
    if (admin.apps && admin.apps.length) {
      return admin.app();
    } else {
      return admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: process.env.GOOGLE_SERVICE_ACCT_EMAIL,
          // A Base64 encoded string value of the google service account private key.
          privateKey: Buffer.from(
            process.env.GOOGLE_SERVICE_ACCT_PK as string,
            "base64"
          ).toString("utf-8"),
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJ_ID,
        }),
        databaseURL: `https://${
          process.env.NEXT_PUBLIC_FIREBASE_PROJ_ID as string
        }.firebaseio.com`,
        storageBucket: `https://${
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE as string
        }.firebaseio.com`,
      });
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}
