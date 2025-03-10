import ReactDOM from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('../firebase-messaging-sw.js')
    .then((registration) => {})
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
} else {
  console.warn('This browser does not support the required APIs for Firebase Messaging.');
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
