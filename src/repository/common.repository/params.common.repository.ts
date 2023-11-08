import path from 'path';

import { params, pagination } from '../../contracts/local.base.params';

export default class ParamsCommonRepository {
  static build(params: params[] | string) {
    if (typeof params === 'string') return params;W

    return params
      .map((item: any) => {
        const _value = typeof item.value === 'string' ? (item.value = `'${item.value}'`) : item.value;
        const _operator = item.operator ? item.operator : '=';
        return `${item.key} ${_operator} ${_value}`;
      })
      .join(' AND ');
  }

  static basePatchSQL(Schema: string) {
    return path.resolve(__dirname, '..', '..', 'sql', Schema);
  }
}
