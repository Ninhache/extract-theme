import { open } from "@tauri-apps/plugin-dialog";
import { readFile } from "@tauri-apps/plugin-fs";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FilterName = "Image" | "All";

const FilterExtensions: Record<FilterName, string[]> = {
  All: ["*"],
  // Text: ["txt", "md", "json"], // We don't need text in the app
  Image: ["png"], // "jpg", "jpeg", "gif" // In the App, we're only handling png
};

export async function openFile(...filters: FilterName[]) {
  const mappedFilters = filters.map((filter) => ({
    name: filter,
    extensions: FilterExtensions[filter],
  }));

  return await open({
    filters: mappedFilters,
  });
}

export function createBlobURL(
  fileContent: Uint8Array,
  mimeType: string
): string {
  const blob = new Blob([new Uint8Array(fileContent)], { type: mimeType });
  return URL.createObjectURL(blob);
}
