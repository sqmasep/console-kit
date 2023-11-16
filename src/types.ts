import type { ConfigOverride } from "./utils/types";

export type ConsoleKitMessage = string;

export interface ConsoleKitOptions {
  filename: {
    isEnabled?: boolean;
  };
  timestamp: ConsoleKitTimestampOptions;
  tags: Record<ConsoleKitTag["name"], ConsoleKitTagOptions>;
  groups: Record<ConsoleKitGroup["name"], ConsoleKitGroupOptions>;
  levels: Partial<
    Record<"log" | "error" | "info" | "warn", ConsoleKitOptionsLevel>
  >;
}

export interface ConsoleKitTag extends ConfigOverride<{ name: string }> {}
export interface ConsoleKitGroup extends ConfigOverride<{ name: string }> {}

// Options
export interface ConsoleKitTagOptions {
  color?: string;
  backgroundColor?: string;
  uppercase?: boolean;
}

export interface ConsoleKitGroupOptions {
  color?: string;
  backgroundColor?: string;
  uppercase?: boolean;
}

export interface ConsoleKitTimestampOptions {
  isEnabled: boolean;
  format: string;
}

export interface ConsoleKitOptionsLevel {
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

// for module augmentation
export interface ConsoleKitAPIOptions
  extends ConfigOverride<{
    useStrictTags: boolean;
    useStrictGroups: boolean;
  }> {}
