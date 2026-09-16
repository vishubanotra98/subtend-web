import Dashboard from "@/components/ui/Dashboard/Dashboard";

export default async function DashboardMain({ params }: any) {
  const { workspaceId } = await params;
  return <Dashboard workspaceId={workspaceId} />;
}

// "use client";

// import { useEffect, useState } from "react";
// import { useWebSocket } from "@/components/Provider/WebSocketProvider";

// export default function TestSocketWidget() {
//   const { isConnected, sendEvent, subscribe } = useWebSocket();
//   const [messages, setMessages] = useState<string[]>([]);

//   console.log("Messages: ", messages)

//   useEffect(() => {
//     // Listen for incoming test pings
//     const unsubscribe = subscribe("TEST_PING", (payload) => {
//       setMessages((prev) => [...prev, `${payload.from}: ${payload.text}`]);
//     });

//     return () => unsubscribe();
//   }, [subscribe]);

//   const handleSend = () => {
//     sendEvent("TEST_PING", {
//       from: "Browser Tab",
//       text: `Hello at ${new Date().toLocaleTimeString()}`,
//     });
//   };

//   return (
//     <div className="p-4 border rounded-lg bg-zinc-900 text-white m-4">
//       <p>Connection: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
//       <button
//         onClick={handleSend}
//         className="px-3 py-1 bg-blue-600 rounded text-sm mt-2 hover:bg-blue-500"
//       >
//         Send Ping to Teammates
//       </button>
//       <div className="mt-2 text-xs text-zinc-400">
//         Incoming messages:
//         {messages.map((m, idx) => (
//           <div key={idx} className="text-emerald-400">
//             {m}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
