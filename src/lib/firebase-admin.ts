import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let isInitialized = false;

const apps = getApps();

if (!apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (projectId && clientEmail && privateKey) {
        try {
            const serviceAccount = {
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n'),
            };

            initializeApp({
                credential: cert(serviceAccount),
            });
            isInitialized = true;
            console.log('Firebase Admin SDK initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Firebase Admin SDK:', error);
        }
    } else {
        console.warn('Firebase Admin SDK environment variables not found. Google authentication will not work with tRPC.');
    }
} else {
    isInitialized = true;
}

export const auth = getAuth();

export const isFirebaseAdminInitialized = () => isInitialized; 