import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = process.env.BASE_URL;
export const SOCKET_BASE_URL = process.env.SOCKET_BASE_URL;
