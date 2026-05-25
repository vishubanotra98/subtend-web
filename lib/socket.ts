import { BASE_URL_API } from "@/apiConstant/apiConstant";
import { io } from "socket.io-client";

export const socket = io(BASE_URL_API);
