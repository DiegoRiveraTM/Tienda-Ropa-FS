import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


console.log("🔎 NEXT_PUBLIC_API_URL:", process.env.NEXT_PUBLIC_API_URL);
