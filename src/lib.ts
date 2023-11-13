import { defaultValues } from "./defaultValues";
import type {
  ConsoleKitOptions,
  ConsoleKitAPIOptions,
  LiteralUnion,
} from "./types";

export class ConsoleKit<const TOptions extends ConsoleKitOptions> {
  private _options: Partial<TOptions> = {};
  private _hasTimestamp = defaultValues.timestamp.isEnabled;
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
      ...this._logMethods,
    };
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

  log(message: unknown) {
    // console.log(message, "hasTimestamp?", this._hasTimestamp);
    this._reset();

    return this;
  }

  private _logMethods = {
    log: this.log.bind(this),
  };

  private _reset() {
    this._hasTimestamp = this._options.timestamp?.isEnabled ?? false;
    this._tag = null;
  }
}
