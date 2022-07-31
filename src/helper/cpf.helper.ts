import { cpf } from 'cpf-cnpj-validator';

export default function (value: string) {
  function isValid(): boolean {
    return cpf.isValid(value);
  }

  function generate(): string {
    return cpf.generate();
  }

  function format(): string {
    return cpf.generate();
  }

  return {
    isValid,
    generate,
    format,
  };
}
