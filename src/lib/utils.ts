import { open, save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type FilterName = "Image" | "All" | "Json";

const FilterExtensions: Record<FilterName, string[]> = {
  All: ["*"],
  Json: ["json"], // We don't need text in the app
  Image: ["png"], // "jpg", "jpeg", "gif" // In the App, we're only handling png
};

// I'm using tauri V2, I want now to save a file, give me an equivalent
export async function openFile(...filters: FilterName[]) {
  const mappedFilters = filters.map((filter) => ({
    name: filter,
    extensions: FilterExtensions[filter],
  }));

  return await open({
    filters: mappedFilters,
  });
}

export async function saveFile(
  defaultName: string,
  content: string,
  ...filters: FilterName[]
) {
  const mappedFilters = filters.map((filter) => ({
    name: filter,
    extensions: FilterExtensions[filter],
  }));

  const filePath = await save({
    defaultPath: defaultName,
    filters: mappedFilters,
  });

  if (filePath) {
    await writeTextFile(filePath, content);
  }
}

export function createBlobURL(
  fileContent: Uint8Array,
  mimeType: string
): string {
  const blob = new Blob([new Uint8Array(fileContent)], { type: mimeType });
  return URL.createObjectURL(blob);
}

export function readFileContentAsString(fileContent: Uint8Array): string {
  return new TextDecoder().decode(fileContent);
}
