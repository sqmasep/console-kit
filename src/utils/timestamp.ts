export type TimestampFormat = string;

// TODO format string
export function getTimestamp(format?: TimestampFormat) {
  return new Date(Date.now()).toLocaleString("en");
}

export function timestampBuilder(format?: TimestampFormat) {
  return `[${getTimestamp(format)}]`;
}
