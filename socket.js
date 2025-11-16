// WebSocket 서버
const server = Bun.serve({
  port: 3055,
  fetch(req, server) {
    const url = new URL(req.url);
    
    // CORS 헤더 추가
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Upgrade, Connection, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Extensions, Sec-WebSocket-Protocol",
    };

    // OPTIONS 요청 처리 (CORS preflight)
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }

    // WebSocket 업그레이드 시도
    if (req.headers.get("upgrade") === "websocket") {
      console.log(`[WebSocket] Upgrade request from ${req.url}`);
      const success = server.upgrade(req, {
        data: {
          createdAt: Date.now(),
        },
      });
      
      if (success) {
        console.log(`[WebSocket] Upgrade successful`);
        return undefined;
      } else {
        console.error(`[WebSocket] Upgrade failed`);
        return new Response("WebSocket upgrade failed", { 
          status: 500,
          headers 
        });
      }
    }

    // 일반 HTTP 요청 처리
    return new Response("WebSocket server is running. Use WebSocket protocol to connect.", {
      status: 200,
      headers: {
        ...headers,
        "Content-Type": "text/plain",
      },
    });
  },
  websocket: {
    message(ws, message) {
      console.log(`[WebSocket] Received: ${message}`);
      try {
        ws.send(JSON.stringify({ type: "echo", data: message }));
      } catch (error) {
        console.error(`[WebSocket] Error sending message:`, error);
      }
    },
    open(ws) {
      console.log(`[WebSocket] New client connected`);
      try {
        ws.send(JSON.stringify({ 
          type: "connected", 
          message: "Connected to WebSocket server",
          timestamp: Date.now()
        }));
      } catch (error) {
        console.error(`[WebSocket] Error sending welcome message:`, error);
      }
    },
    close(ws) {
      console.log(`[WebSocket] Client disconnected`);
    },
    error(ws, error) {
      console.error(`[WebSocket] Error:`, error);
    },
  },
});

console.log(`[WebSocket] Server running on ws://localhost:${server.port}`);
console.log(`[WebSocket] HTTP endpoint: http://localhost:${server.port}`);

