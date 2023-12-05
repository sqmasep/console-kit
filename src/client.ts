import { ConsoleKit } from "./lib";

declare module "./types" {
  interface ConsoleKitAPIOptions {
    useStrictTags: true;
    useStrictGroups: true;
  }

  interface ConsoleKitTag {
    names: "ooo" | "epic" | "shouldLog";
  }

  // FIXME autocomplete only works when there is a module augmentation
  // for ConsoleKitGroup for some reason
  // interface ConsoleKitGroup {
  //   names: "database" | "soldProduct";
  // }
}

export const consolekit = new ConsoleKit({
  // shouldLog: false,
  timestamp: {
    isDefaultEnabled: false,
    format: "YYYY-MM-DD HH:mm:ss",
  },
  tags: {
    // shouldLog: true,
    epic: {
      shouldLog: false,
      color: "#f00",
      backgroundColor: "#000",
      uppercase: false,
    },
    ooo: {
      // shouldLog: false,
      uppercase: true,
    },
  },

  groups: {
    database: { uppercase: true },
    soldProduct: {},
  },

  levels: {
    error: {},
    log: {},
    info: {},
  },
});

consolekit.tag("ooo");
