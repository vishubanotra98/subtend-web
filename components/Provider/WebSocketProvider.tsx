"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type WebSocketMessage = {
  type: string;
  eventType?: string;
  payload?: any;
  [key: string]: any;
};

type WebSocketContextType = {
  isConnected: boolean;
  sendEvent: (eventType: string, payload: any) => void;
  subscribe: (
    eventType: string,
    callback: (payload: any) => void,
  ) => () => void;
};

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
  workspaceId: string;
  userId: string;
}

export function WebSocketProvider({
  children,
  workspaceId,
  userId,
}: WebSocketProviderProps) {
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  const listenersRef = useRef<Map<string, Set<(payload: any) => void>>>(
    new Map(),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL as string;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(
        JSON.stringify({
          type: "SUBSCRIBE",
          workspaceId,
          userId,
        }),
      );
    };

    ws.onmessage = (event) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        const { eventType, payload } = data;

        if (eventType && listenersRef.current.has(eventType)) {
          const callbacks = listenersRef.current.get(eventType)!;
          callbacks.forEach((cb) => cb(payload));
        }
      } catch (err) {
        console.error("Failed to parse incoming WebSocket message:", err);
      }
    };

    ws.onclose = () => {
      setIsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket encountered an error:", err);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [workspaceId, userId]);

  const sendEvent = (eventType: string, payload: any) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({
          type: "WORKSPACE_EVENT",
          eventType,
          payload,
        }),
      );
    } else {
      console.warn("Cannot send event, WebSocket is not open");
    }
  };

  const subscribe = (eventType: string, callback: (payload: any) => void) => {
    if (!listenersRef.current.has(eventType)) {
      listenersRef.current.set(eventType, new Set());
    }
    listenersRef.current.get(eventType)!.add(callback);

    return () => {
      const callbacks = listenersRef.current.get(eventType);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          listenersRef.current.delete(eventType);
        }
      }
    };
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, sendEvent, subscribe }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
