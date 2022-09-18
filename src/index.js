import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import { SearchChatProvider } from './context/SearchChat';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <SearchChatProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </SearchChatProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);

