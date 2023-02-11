/* eslint-disable node/no-process-env */
import { z } from 'zod'

const zEnv = z.object({
  NEXT_PUBLIC_BACKEND_API_URL: z.string().min(1),
})

export const env = zEnv.parse({
  NEXT_PUBLIC_BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
})
