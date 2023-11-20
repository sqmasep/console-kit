import type { ConsoleKitOptions } from "./types";
import type { Except } from "./utils/types";

export const defaultValues: Except<ConsoleKitOptions, "tags" | "groups"> = {
  levels: {
    error: {},
  },

  filename: {
    isEnabled: false,
  },

  timestamp: {
    isDefaultEnabled: true,
    format: "YYYY-MM-DD HH:mm:ss",
  },
};
