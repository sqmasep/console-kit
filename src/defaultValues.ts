import type { ConsoleKitOptions } from "./types";
import type { Except } from "./utils/types";

export const defaultValues: Except<ConsoleKitOptions, "tags" | "groups"> = {
  levels: {
    error: {},
  },

  timestamp: {
    isEnabled: true,
    format: "YYYY-MM-DD HH:mm:ss",
  },
};
