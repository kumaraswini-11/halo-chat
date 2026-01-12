import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Returns the first `limit` characters of a name (ignoring spaces).
export function getInitials(name: string, limit = 2): string {
  // Guard clause: handle empty or whitespace-only input
  if (!name?.trim()) return "";

  // Remove all spaces from the name
  const normalizedName = name.replace(/\s+/g, "");

  // Take the first `limit` characters and convert to uppercase
  return normalizedName.slice(0, limit).toUpperCase();
}
