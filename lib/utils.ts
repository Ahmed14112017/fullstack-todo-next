import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cuttitle(title: string) {
  if (title.length <= 50) {
    return title;
  } else {
    return title.slice(0, 50) + "...";
  }
}
