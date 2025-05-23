import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const web_push_token = import.meta.env.VITE_FIREBASE_WEB_PUSH_TOKEN;

export const requestForToken = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, { vapidKey: web_push_token });
    if (token) {
      return token;
    } else {
      return null;
    }
  } catch (error) {
    console.error('FCM Token Error:', error);
    return null;
  }
};

// 포그라운드 알림 수신
export const onMessageListener = (messageListener: (payload: any) => void): (() => void) => {
  return onMessage(messaging, (payload) => {
    messageListener(payload);
  });
};

export default app;
