import { Box, Image, Stack } from 'grommet'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'

const imagePathWrapper = (path: string) => '/images/' + path + '.png'

const sizeMap = {
  small: 100,
  medium: 140,
  large: 180,
  enormous: 200,
}

const colorMap = {
  black: '#263238',
  white: '#cfd8dc',
  green: '#a5d6a7',
  blue: '#0277bd',
}

const Background = styled(Image)`
  ${(props: { size: string }) => css`
    height: ${sizeMap[props.size]}px;
    width: ${sizeMap[props.size]}px;
  `}
`

const DragonImage: FC<API.ImageProps> = (props) => {
  const { size, backgroundColor, build, patten } = props

  return (
    <Box margin='auto' pad='small' animation='zoomIn'>
      <Stack fill>
        <Box background={colorMap[backgroundColor]}>
          <Background src={imagePathWrapper(patten)} size={size} />
        </Box>
        <Background src={imagePathWrapper(build)} size={size} />
      </Stack>
    </Box>
  )
}

export default DragonImage
