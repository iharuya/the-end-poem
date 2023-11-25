export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.NEXT_PUBLIC_VERCEL_URL &&
    "https://" + process.env.NEXT_PUBLIC_VERCEL_URL) ||
  "http://localhost:3000"
