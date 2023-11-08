export type param<P> = {
  key: string;
  value: P;
  operator: string;
};

export abstract class params {
  public static create<P>(key: string, value: P): param<P> {
    return { key, value, operator: '=' };
  }
}

export type pagination = {
  limit: number;
  offset: number;
};
