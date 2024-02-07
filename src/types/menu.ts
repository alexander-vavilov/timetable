import { IconType } from 'react-icons'

export interface IMenu {
  items: IMenuItem[]
  handleClose: () => void
}

export interface IMenuItem {
  label: string
  icon?: IconType
  action?: () => void
  warning?: {
    title: string
    message: string
    commitLabel: string
  }
  subMenu?: IMenuItem[]
  divider?: boolean
}
