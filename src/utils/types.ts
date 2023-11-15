/* eslint-disable-next-line @typescript-eslint/ban-types */
export type LiteralUnion<T> = T | (string & {});

export type Except<TObj, TKey extends LiteralUnion<keyof TObj>> = Omit<
  TObj,
  TKey
>;

export type ConfigOverride<TConfig extends Record<PropertyKey, unknown>> =
  TConfig;
