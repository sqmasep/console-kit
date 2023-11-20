import type { ConfigOverride } from "./utils/types";

export type ConsoleKitMessage = string;

export interface ShouldLogConfig {
  shouldLog?: boolean;
}

export interface ConsoleKitOptions extends ShouldLogConfig {
  filename: {
    isEnabled?: boolean;
  };
  timestamp: ConsoleKitTimestampOptions;
  tags: Record<
    Exclude<ConsoleKitTag["names"], keyof ShouldLogConfig>,
    ConsoleKitTagOptions
  > &
    ShouldLogConfig;
  groups: Record<ConsoleKitGroup["names"], ConsoleKitGroupOptions>;
  levels: Partial<
    Record<"log" | "error" | "info" | "warn", ConsoleKitLevelOptions>
  >;
}

export interface ConsoleKitTag extends ConfigOverride<{ names: string }> {}
export interface ConsoleKitGroup extends ConfigOverride<{ names: string }> {}

// Options
export interface ConsoleKitTagOptions {
  color?: string;
  backgroundColor?: string;
  uppercase?: boolean;
  shouldLog?: boolean;
}

export interface ConsoleKitGroupOptions {
  color?: string;
  backgroundColor?: string;
  uppercase?: boolean;
  shouldLog?: boolean;
}

export interface ConsoleKitTimestampOptions {
  isDefaultEnabled: boolean;
  format: string;
}

export interface ConsoleKitLevelOptions {
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  shouldLog?: boolean;
}

// for module augmentation
export interface ConsoleKitAPIOptions
  extends ConfigOverride<{
    useStrictTags: boolean;
    useStrictGroups: boolean;
  }> {}
