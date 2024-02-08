import { IconType } from 'react-icons'

export interface MenuProps {
  items: MenuItem[]
  onRequestClose: () => void
  variant?: 'shrink' | 'default'
}

export interface MenuItem {
  label: string
  icon?: IconType
  action?: () => void
  warning?: {
    name: string
    message: string
    confirmLabel: string
  }
  subMenu?: MenuItem[]
  permission?: boolean
}
