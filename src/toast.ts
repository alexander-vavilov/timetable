import { toast } from 'sonner'

export const toastError = (error: unknown) => {
  toast.error(error instanceof Error ? error.message : 'Что-то пошло не так...')
}
