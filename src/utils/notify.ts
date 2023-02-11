import toast, { type ToastOptions, Toaster } from 'react-hot-toast'

export type NotifyProps = { message: string; type: 'success' | 'error' } & ToastOptions
export const notify = ({ message, type, ...restProps }: NotifyProps) =>
  toast[type](message, {
    position: 'bottom-center',
    ...restProps,
  })
// dirty hack, dky it should be exported from here
export const MyToaster = Toaster
