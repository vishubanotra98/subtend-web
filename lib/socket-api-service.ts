import { BASE_URL_API } from "@/apiConstant/apiConstant";

const socketService = async (event: string, data: any) => {
  await fetch(`${BASE_URL_API}/api/broadcast`, {
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
