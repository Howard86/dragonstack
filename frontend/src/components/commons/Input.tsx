import React, { useState, FC } from 'react'
import { TextInput } from 'grommet'

type InputProps = {
  displayValue: string
  placeholder: string
}

const Input: FC<InputProps> = (props: InputProps) => {
  const [value, setValue] = useState(props.displayValue)
  return (
    <TextInput
      placeholder={props.placeholder}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  )
}

export default Input
