/* eslint-disable-next-line @typescript-eslint/ban-types */
export type LiteralUnion<T> = T | (string & {});

export interface ConsoleKitOptions {
  timestamp: ConsoleKitTimestampOptions;
  tags: Record<ConsoleKitTag["name"], ConsoleKitTagOptions>;
  groups: Record<ConsoleKitGroup["name"], ConsoleKitGroupOptions>;
  levels: Partial<
    Record<"log" | "error" | "info" | "warn", ConsoleKitOptionsLevel>
  >;
}

interface AugmentationName {
  name: string;
}

export interface ConsoleKitTag extends AugmentationName {}
export interface ConsoleKitGroup extends AugmentationName {}

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
  extends Partial<{
    useStrictTags: boolean;
    useStrictGroups: boolean;
  }> {}
