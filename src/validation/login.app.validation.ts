import { z } from 'zod';

export const loginAppSchema = z.object({
  Nome: z.string().min(1, 'Nome é obrigatório').max(30, 'Nome deve ter no máximo 30 caracteres').trim(),
  Senha: z.string().min(4, 'Senha deve ter no mínimo 6 caracteres').max(20, 'Senha deve ter no máximo 50 caracteres'),

  FotoUsuario: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true;
      try {
        Buffer.from(val, 'base64');
        return true;
      } catch {
        return false;
      }
    }, 'FotoUsuario deve ser uma string base64 válida'),
});

export type LoginAppRequest = z.infer<typeof loginAppSchema>;
