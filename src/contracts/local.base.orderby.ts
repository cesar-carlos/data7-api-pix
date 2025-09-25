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
