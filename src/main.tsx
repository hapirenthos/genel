import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // Tailwind kuralları

// NOT: VitePWA eklentisi 'injectRegister: inline' modunda olduğu için
// buraya ekstra bir registerSW importu yapmamıza gerek yoktur.
// Eklenti, sistemi arka planda otomatik olarak ayağa kaldırır.

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
