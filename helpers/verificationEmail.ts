import { Resend } from "resend";

const resendApiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY;
export const resend = new Resend(resendApiKey);
