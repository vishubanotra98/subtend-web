import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const SOCKET_BASE_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL;
