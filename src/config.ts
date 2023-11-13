import { ConsoleKit } from "./lib";

declare module "./types" {
  interface ConsoleKitAPIOptions {
    useStrictTags: true;
    useStrictGroups: true;
  }

  interface ConsoleKitTag {
    name: "ooo" | "epic";
  }

  // interface ConsoleKitGroup {
  //   name: "database" | "ntmok";
  // }
}

export const consolekit = new ConsoleKit({
  timestamp: {
    isEnabled: true,
    format: "YYYY-MM-DD HH:mm:ss",
  },
  tags: {
    epic: { uppercase: true },
    ooo: {
      uppercase: true,
    },
  },

  groups: {
    database: { uppercase: true },
    soldProduct: {},
  },

  levels: {
    error: {},
  },
});

consolekit.startGroup("soldProduct");
consolekit.log("ee");

if (consolekit.hasGroup) {
  console.log(consolekit.getGroup());
  consolekit.tag("epic");
  console.log(consolekit.getTag());
}
consolekit.endGroup();

consolekit.timestamp.tag("ooo").log("");
