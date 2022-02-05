import admin from "firebase-admin";

export default function init(): admin.app.App {
  if (admin.apps?.length) {
    return admin.app();
  } else {
    return admin.initializeApp({
      credential: admin.credential.cert({
        clientEmail: process.env.GOOGLE_SERVICE_ACCT_EMAIL,
        privateKey: Buffer.from(
          process.env.GOOGLE_SERVICE_ACCT_PK as string
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
}
