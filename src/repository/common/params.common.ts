import path from 'path';
import { Params } from '../../contracts/local.base.params';

export default class ParamsCommonRepository {
  static build(params: Params[] | string[] | string[][]) {
    if (typeof params === 'string') {
      return params;
    }

    if (!Array.isArray(params)) {
      return '';
    }

    if (params.length === 0) {
      return '';
    }

    if (Array.isArray(params[0])) {
      try {
        const result = (params as string[][])
          .map((arrayItem: string[]) => {
            if (!Array.isArray(arrayItem) || arrayItem.length < 2) {
              throw new Error(
                `Parâmetro de array inválido: esperado array com pelo menos [key, operator, value] ou [key, value], recebido: ${JSON.stringify(arrayItem)}`,
              );
            }

            const [key, operatorOrValue, value] = arrayItem;

            if (arrayItem.length === 3) {
              const _value = typeof value === 'string' && !value.startsWith("'") ? `'${value}'` : value;
              return `${key} ${operatorOrValue} ${_value}`;
            }

            if (arrayItem.length === 2) {
              const _value =
                typeof operatorOrValue === 'string' && !operatorOrValue.startsWith("'")
                  ? `'${operatorOrValue}'`
                  : operatorOrValue;
              return `${key} = ${_value}`;
            }

            throw new Error(`Array deve ter 2 ou 3 elementos, recebido: ${arrayItem.length}`);
          })
          .join(' AND ');

        return result;
      } catch (error: any) {
        console.error('ParamsCommonRepository.build - Error processing array of arrays:', error.message);
        throw error;
      }
    }

    if (typeof params[0] === 'string') {
      const result = (params as string[]).join(' AND ');
      return result;
    }

    try {
      const result = (params as Params[])
        .map((item: any) => {
          if (!item || typeof item !== 'object' || !item.key) {
            throw new Error(
              `Parâmetro inválido: esperado objeto com propriedades {key, value, operator}, recebido: ${JSON.stringify(item)}`,
            );
          }

          const _value = typeof item.value === 'string' ? `'${item.value}'` : item.value;
          const _operator = item.operator ? item.operator : '=';
          return `${item.key} ${_operator} ${_value}`;
        })
        .join(' AND ');

      return result;
    } catch (error: any) {
      console.error('ParamsCommonRepository.build - Error processing object array:', error.message);
      throw error;
    }
  }

  static basePatchSQL(Schema: string) {
    return path.resolve(__dirname, '..', '..', 'sql', Schema);
  }
}
