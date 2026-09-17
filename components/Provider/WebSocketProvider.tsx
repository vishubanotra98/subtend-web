"use client";

import { WebSocketContextType, WebSocketProviderProps } from "@/types/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({
  children,
  workspaceId,
  userId,
}: WebSocketProviderProps) => {
  const [wsConnected, setWsConnected] = useState<null | boolean>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const listenersRef = useRef<Map<string, Set<(payload: any) => void>>>(
    new Map(),
  );

  useEffect(() => {
    if (!workspaceId || !userId) return;

    const wsUri = process.env.NEXT_PUBLIC_WS_URL as string;
    const ws = new WebSocket(wsUri);
    wsRef.current = ws;

    ws.onopen = () => {
      setWsConnected(true);
      const initalPaylaod = JSON.stringify({
        type: "SUBSCRIBE",
        workspaceId,
        userId,
      });
      ws.send(initalPaylaod);
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { eventType, payload } = data;

        if (eventType && listenersRef?.current.has(eventType)) {
          const callBacks = listenersRef.current.get(eventType);
          callBacks?.forEach((cb: any) => cb(payload));
        }
      } catch (error) {
        console.error("Failed to parse incoming WebSocket message:", error);
      }
    };

    ws.onclose = () => {
      setWsConnected(false);
    };

    ws.onerror = (err) => {
      console.error("WebSocket encountered an error:", err);
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [workspaceId, userId]);

  const sendEvent = useCallback((eventType: string, payload: any) => {
    if (
      eventType &&
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN
    ) {
      const wsPayload = JSON.stringify({
        type: "WORKSPACE_EVENT",
        eventType,
        payload,
      });
      wsRef.current?.send(wsPayload);
    }
  }, []);

  const subscribe = useCallback(
    (eventType: string, callback: (payload: any) => void) => {
      if (eventType && !listenersRef.current.has(eventType)) {
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
    },
    [],
  );

  return (
    <WebSocketContext.Provider value={{ wsConnected, subscribe, sendEvent }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
}
