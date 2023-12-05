import path from "path";
import { defaultValues } from "./defaultValues";
import type {
  ConsoleKitOptions,
  ConsoleKitAPIOptions,
  ConsoleKitMessage,
  ShouldLogConfig,
  ConsoleKitTagOptions,
} from "./types";
import type { LiteralUnion } from "./utils/types";
import chalk from "chalk";
import { timestampBuilder } from "./utils/timestamp";

export class ConsoleKit<const TOptions extends ConsoleKitOptions> {
  private _options: Partial<TOptions> = {};

  private _hasTimestamp = defaultValues.timestamp.isDefaultEnabled;
  private _hasFilename = defaultValues.filename.isEnabled;

  // private _tag: keyof TOptions["tags"] | null = null;
  private _tag: string | null = null;
  private _group: string | null = null;

  constructor(options: Partial<TOptions> = {}) {
    this._options = options;
    this._hasTimestamp =
      options.timestamp?.isDefaultEnabled ??
      defaultValues.timestamp.isDefaultEnabled;
  }

  get timestamp() {
    this._hasTimestamp = true;

    return {
      tag: this.tag.bind(this),
      startTime: this.startTime.bind(this),
      filename: this.filename,
      ...this._logMethods,
    };
  }

  get filename() {
    this._hasFilename = true;
    // FIXME temporary return `this`
    return this;
  }

  get hasGroup() {
    return this._group !== null;
  }

  tag(
    tag: ConsoleKitAPIOptions["useStrictTags"] extends false
      ? LiteralUnion<Exclude<keyof TOptions["tags"], keyof ShouldLogConfig>>
      : // if undefined or true, use strict typing
        Exclude<keyof TOptions["tags"], keyof ShouldLogConfig>,
  ) {
    // this._tag = tag as Exclude<keyof TOptions["tags"], keyof ShouldLogConfig>;
    this._tag = tag as string;

    return {
      ...this._logMethods,
    };
  }

  getTag() {
    return this._tag;
  }

  startGroup(
    group: ConsoleKitAPIOptions["useStrictGroups"] extends false
      ? LiteralUnion<keyof TOptions["groups"]>
      : // if undefined or true, use strict typing
        keyof TOptions["groups"],
  ) {
    this._group = group as string;

    return {
      endGroup: this.endGroup.bind(this),
      timestamp: this.timestamp,
      ...this._logMethods,
    };
  }

  endGroup() {
    this._group = null;
    return this._logMethods;
  }

  getGroup() {
    return this._group;
  }

  log(message: ConsoleKitMessage): void {
    if (!this._checkShouldLog()) {
      this._reset();
      return;
    }

    const optionsToShow = [
      this._hasTimestamp ? timestampBuilder() : false,
      this._tagBuilder(),
      message,
      this._groupBuilder(),
    ].filter(Boolean);

    console.log(optionsToShow.join(" "));

    this._reset();
  }

  startTime(message?: ConsoleKitMessage) {
    const start = performance.now();

    if (message !== undefined) console.log(timestampBuilder(), message);

    return {
      endTime: (cb: (timeDiff: number) => ConsoleKitMessage): number => {
        const diff = performance.now() - start;
        this.log(cb(diff));
        return diff;
      },
    };
  }

  // TODO basically it should return formatted colors i believe
  // for example, if `level` is `log`, use this._options.levels.log
  // and return the unicode according to the options
  private _createLog(level: keyof TOptions["levels"]) {
    return this;
  }

  private _checkShouldLog(): boolean {
    // TODO i still havent done for `levels` btw
    // TODO i may need to do two waterfalls
    // if this._options.shouldLog is true, check if this._options.tags.shouldLog is true etc
    // if it's false, return false

    // other waterfall is in the opposite case, i guess:
    // if this._options.shouldLog is false, check if there's any "true" at some point

    if (this._options.shouldLog === true) return this._options.shouldLog;

    if (this._options.tags?.shouldLog === true)
      return this._options.tags.shouldLog;

    // FIXME typecast is not safe and is a stupid solution
    if (
      this._tag !== null &&
      this._options.tags?.[this._tag as "epic"]?.shouldLog !== undefined
    ) {
      return this._options.tags[this._tag as "epic"]
        .shouldLog as unknown as boolean;
    }

    return true;
  }

  private _tagBuilder() {
    const tag = this._tag;
    if (tag === null) return "";

    const tagOptions = (
      this._options.tags as Record<string, ConsoleKitTagOptions> &
        ShouldLogConfig
    )[tag];

    if (tagOptions === undefined) return "";

    const { color, backgroundColor, uppercase } = tagOptions;

    return chalk.hex(color ?? "#00fff2").bgHex(backgroundColor ?? "#001c1b")(
      `[${uppercase ? tag.toUpperCase() : tag}]`,
    );
  }

  private _filenameBuilder() {
    const filename = new Error().stack;
    // console.log(filename);
    return "";
    // return this._hasFilename ? `${chalk.gray.italic(`${filename}`)}` : "";
  }

  private _groupBuilder() {
    return this.hasGroup ? "║" : "";
  }

  private _logMethods = {
    log: this.log.bind(this),
  };

  private _reset() {
    this._hasTimestamp =
      this._options.timestamp?.isDefaultEnabled ??
      defaultValues.timestamp.isDefaultEnabled;
    this._hasFilename =
      this._options.filename?.isEnabled ?? defaultValues.filename.isEnabled;
    this._tag = null;

    return this;
  }
}
