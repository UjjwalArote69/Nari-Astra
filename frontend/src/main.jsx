import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(
  document.getElementById("root"),
).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="368098973699-jf9u3umhocohjsk6gjdh6a75jo4ajmp5.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
);
