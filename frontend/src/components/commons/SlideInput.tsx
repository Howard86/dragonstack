import React, { FC } from 'react'
import { Stack, RangeInput, Box, Text } from 'grommet'

type SlideInputProps = {
  name: string
  value: number
  onChange: (event) => void
}

const SlideInput: FC<SlideInputProps> = (props) => (
  <Box direction='row' gap='small'>
    <Text>{props.name}</Text>
    <Stack anchor='top'>
      <RangeInput max={100} min={0} step={1} {...props} />
      <Box align='center'>
        <Text>{props.value}</Text>
      </Box>
    </Stack>
  </Box>
)

export default SlideInput
