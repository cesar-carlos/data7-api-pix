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

export class Pagination {
  public limit: number;
  public offset: number;
  public page: number;

  constructor(query?: string) {
    const params = query ? new URLSearchParams(query) : undefined;
    this.limit = params?.get('LIMIT') ? Number(params.get('LIMIT')) : 100;
    this.offset = params?.get('OFFSET') ? Number(params.get('OFFSET')) : 0;
    this.page = params?.get('PAGE') ? Number(params.get('PAGE')) : 1;
  }

  getLimit(): number {
    return this.limit;
  }

  getOffset(): number {
    return this.offset;
  }

  getPage(): number {
    return this.page;
  }
}
