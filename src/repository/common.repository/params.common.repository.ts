import path from 'path';

import { params } from '../../contracts/local.base.repository.contract';

export default class ParamsCommonRepository {
  static build(params: params[]) {
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
