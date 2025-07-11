import { serve } from "bun";

// Einfacher Echo-WebSocket-Server (Port 8080)
serve({
  port: 8080,
  websocket: {
    open(ws) {
      console.log("client connected:", ws.remoteAddress);
    },
    message(ws, data) {
      // alles, was wir empfangen, sofort an alle senden
      ws.publish("broadcast", data);
    },
  },
});
