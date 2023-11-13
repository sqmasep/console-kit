import type { ConsoleKitOptions } from "./types";

export const defaultValues: Pick<ConsoleKitOptions, "timestamp" | "levels"> = {
  levels: {
    error: {},
  },

  timestamp: {
    isEnabled: true,
    format: "YYYY-MM-DD HH:mm:ss",
  },
};
