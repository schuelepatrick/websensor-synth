// src/server/index.ts
import { serve } from "bun";

serve({
  port: 8080,

  // Upgrade HTTP → WebSocket  (ansonsten einfache Text-Antwort)
  fetch(req, server) {
    if (server.upgrade(req)) return;                // 👈  Handshake handled
    return new Response("WebSensor-Synth WS relay"); // Fallback für Browser-Ping
  },

  websocket: {
    open(ws) {
      console.log("client connected:", ws.remoteAddress);
    },
    message(ws, data) {
      // Alle Nachrichten 1-zu-n broadcasten
      ws.publish("broadcast", data);
    },
  },
});
