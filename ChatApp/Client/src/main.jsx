import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './App.css';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/authContext.jsx';
import { ChatContextProvier } from './contexts/chatContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <ChatContextProvier>
        <App />
      </ChatContextProvier>
    </AuthContextProvider>
  </StrictMode>
);
