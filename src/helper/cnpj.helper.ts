import { cnpj } from 'cpf-cnpj-validator';

export default function (value: string) {
  function isValid(): boolean {
    return cnpj.isValid(value);
  }

  function generate(): string {
    return cnpj.generate();
  }

  function format(): string {
    return cnpj.generate();
  }

  return {
    isValid,
    generate,
    format,
  };
}
