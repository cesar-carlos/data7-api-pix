import { z } from 'zod';

export const usuarioConsultaQuerySchema = z.object({
  codUsuario: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val > 0), {
      message: 'codUsuario deve ser um número válido maior que 0',
    }),

  nomeUsuario: z
    .string()
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: 'nomeUsuario não pode ser uma string vazia',
    }),

  codEmpresa: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .refine((val) => val === undefined || (!isNaN(val) && val > 0), {
      message: 'codEmpresa deve ser um número válido maior que 0',
    }),

  ativo: z
    .string()
    .optional()
    .refine((val) => !val || ['S', 'N'].includes(val.toUpperCase()), {
      message: 'ativo deve ser "S" ou "N"',
    })
    .transform((val) => val?.toUpperCase()),

  page: z
    .string()
    .optional()
    .default('1')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0, {
      message: 'page deve ser um número válido maior que 0',
    }),

  limit: z
    .string()
    .optional()
    .default('100')
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val > 0 && val <= 500, {
      message: 'limit deve ser um número válido entre 1 e 500',
    }),
});

export type UsuarioConsultaQuery = z.infer<typeof usuarioConsultaQuerySchema>;
