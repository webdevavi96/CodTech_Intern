import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";
import { ChatContextProvider } from "./contexts/chatContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthContextProvider>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </AuthContextProvider>
  //</StrictMode>
);
