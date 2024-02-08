import { cn } from './utils'

export const menuStyles = (isWarning: boolean) => ({
  button: {
    default: cn('rounded-md p-2 transition-colors', {
      'hover:bg-gray-200/50 active:bg-gray-200/50 peer-hover:bg-gray-200/50 dark:text-white dark:hover:bg-neutral-700/70 dark:active:bg-neutral-700/60 dark:peer-hover:bg-neutral-700/70':
        !isWarning,
      'text-red-500 hover:bg-red-400/20 active:bg-red-400/15 peer-hover:bg-red-400/20':
        isWarning
    }),
    shrink: cn('my-0.5 px-2 py-1 text-sm rounded-[4px]', {
      'dark:text-white/70 dark:hover:text-white dark:active:text-white dark:peer-hover:text-white hover:bg-green-700/70 active:bg-green-700/60 peer-hover:bg-green-700/70':
        !isWarning,
      'text-red-500 hover:bg-red-500/30 active:bg-red-500/40 peer-hover:bg-red-500/30':
        isWarning
    })
  },
  icon: {
    default: cn('p-2 rounded-full', {
      'bg-gray-300/50 dark:bg-neutral-600': !isWarning,
      'bg-red-400/20': isWarning
    }),
    shrink: ''
  }
})
