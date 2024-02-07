import { IconType } from 'react-icons'

export interface MenuProps {
  items: MenuItem[]
  handleClose: () => void
}

export interface MenuItem {
  label: string
  icon?: IconType
  action?: () => void
  warning?: {
    title: string
    message: string
    commitLabel: string
  }
  subMenu?: MenuItem[]
  divider?: boolean
}
