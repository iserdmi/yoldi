import { z } from 'zod'

export const zStringRequired = z.string({ required_error: 'Обязательное поле' }).min(1)
export const zStringOptional = z.string().optional()
export const zEmailRequired = z.string({ required_error: 'Обязательное поле' }).email('Невалидный адрес почты').min(1)
