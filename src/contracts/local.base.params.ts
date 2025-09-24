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

  private constructor(query?: string) {
    const params = query ? new URLSearchParams(query) : undefined;
    this.limit = params?.get('LIMIT') ? Number(params.get('LIMIT')) : 100;
    this.offset = params?.get('OFFSET') ? Number(params.get('OFFSET')) : 0;
    this.page = params?.get('PAGE') ? Number(params.get('PAGE')) : 1;
  }

  static fromObject(obj?: any): Pagination {
    if (!obj) return new Pagination();
    return new Pagination(`LIMIT=${obj.limit || 100}&OFFSET=${obj.offset || 0}&PAGE=${obj.page || 1}`);
  }

  static fromQueryString(queryString?: string): Pagination {
    if (!queryString) return new Pagination();
    return new Pagination(queryString);
  }

  static create(limit: number = 100, offset: number = 0, page: number = 1): Pagination {
    return new Pagination(`LIMIT=${limit}&OFFSET=${offset}&PAGE=${page}`);
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

export class OrderBy {
  public orderBy: string;
  public orderDirection: string;

  private constructor(query?: string) {
    const params = query ? new URLSearchParams(query) : undefined;
    this.orderBy = params?.get('order_by') ?? '';
    this.orderDirection = params?.get('order_direction') ?? '';
  }

  static fromObject(obj?: any): OrderBy {
    if (!obj) return new OrderBy();
    return new OrderBy(`order_by=${obj.field || ''}&order_direction=${obj.direction || ''}`);
  }

  static fromQueryString(queryString?: string): OrderBy {
    if (!queryString) return new OrderBy();
    return new OrderBy(queryString);
  }

  static create(field: string = '', direction: string = 'ASC'): OrderBy {
    return new OrderBy(`order_by=${field}&order_direction=${direction}`);
  }

  getOrderBy(): string {
    return this.orderBy;
  }

  getOrderDirection(): string {
    return this.orderDirection;
  }

  getFullOrderBy(): string {
    if (!this.orderBy) return '';
    return `${this.orderBy} ${this.orderDirection}`;
  }

  isValid(): boolean {
    return this.orderBy !== '' && ['ASC', 'DESC'].includes(this.orderDirection.toUpperCase());
  }
}
