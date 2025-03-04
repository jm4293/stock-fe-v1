import ReactDOM from 'react-dom/client';
import App from './App';

if ('serviceWorker' in navigator) {
  // navigator.serviceWorker
  //   .register('/firebase-messaging-sw.js')
  //   .then((registration) => {
  //     console.log('Service Worker registered:', registration);
  //   })
  //   .catch((error) => {
  //     console.error('Service Worker registration failed:', error);
  //   });

  navigator.serviceWorker.register('/firebase-messaging-sw.js');
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<App />);
