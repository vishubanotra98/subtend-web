import { SOCKET_BASE_URL } from "./utils";

const socketService = async (event: string, data: any) => {
  await fetch(`${SOCKET_BASE_URL}/api/broadcast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      data: {
        data,
      },
    }),
  });
};

export default socketService;
