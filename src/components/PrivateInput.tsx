import { ChangeEvent, FC } from 'react'
import Input from './Input'
import { InputType } from '../types'

type PrivateInputType = {
  condition: boolean
} & InputType

const PrivateInput: FC<PrivateInputType> = ({
  condition,
  onChange,
  ...props
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (condition) onChange(e)
  }

  return (
    <Input
      onChange={handleInputChange}
      disabled={!condition}
      readOnly={!condition}
      {...props}
    />
  )
}

export default PrivateInput
