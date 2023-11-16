import path from "path";
import { defaultValues } from "./defaultValues";
import type {
  ConsoleKitOptions,
  ConsoleKitAPIOptions,
  ConsoleKitMessage,
} from "./types";
import type { LiteralUnion } from "./utils/types";
import chalk from "chalk";

export class ConsoleKit<const TOptions extends ConsoleKitOptions> {
  private _options: Partial<TOptions> = {};

  private _hasTimestamp = defaultValues.timestamp.isEnabled;
  private _hasFilename = defaultValues.filename.isEnabled;

  private _tag: string | null = null;
  private _group: string | null = null;

  constructor(options: Partial<TOptions> = {}) {
    this._options = options;
    this._hasTimestamp =
      options.timestamp?.isEnabled ?? defaultValues.timestamp.isEnabled;
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
      ? LiteralUnion<keyof TOptions["tags"]>
      : // if undefined or true, use strict typing
        keyof TOptions["tags"],
  ) {
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

  log(message: ConsoleKitMessage) {
    console.log(
      `${this._timestampBuilder()}${message} ${this._filenameBuilder()}`,
    );
    this._reset();

    return this;
  }

  startTime(message?: ConsoleKitMessage) {
    const start = Date.now();

    if (message !== undefined) console.log(this._timestampBuilder(), message);

    return {
      endTime: (cb: (timeDiff: number) => ConsoleKitMessage): number => {
        const diff = Date.now() - start;
        this.log(cb(diff));
        return diff;
      },
    };
  }

  private _filenameBuilder() {
    const filename = new Error().stack;
    console.log(filename);
    return "";
    // return this._hasFilename ? `${chalk.gray.italic(`${filename}`)}` : "";
  }

  private _groupBuilder() {
    return this.hasGroup ? "║" : "";
  }

  private _timestampBuilder() {
    return this._hasTimestamp ? `[${new Date().toLocaleString("en")}] ` : "";
  }

  private _logMethods = {
    log: this.log.bind(this),
  };

  private _reset() {
    this._hasTimestamp =
      this._options.timestamp?.isEnabled ?? defaultValues.timestamp.isEnabled;
    this._hasFilename =
      this._options.filename?.isEnabled ?? defaultValues.filename.isEnabled;
    this._tag = null;
  }
}
