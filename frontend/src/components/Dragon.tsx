import React, { FC } from 'react'
import { Box, Text } from 'grommet'

import Spinner from './commons/Spinner'
import DragonImage from './commons/DragonImage'

type DragonProps = {
  dragon: API.Dragon
  showPrice?: boolean
  showDetail?: boolean
}

const Dragon: FC<DragonProps> = (props) => {
  const { dragon, showPrice } = props
  if (!dragon) {
    return <Spinner />
  }

  const { id, generation, traits, nickname } = dragon

  const normalizedTraits = Object.fromEntries(
    traits.map((trait) => [trait.traitType, trait.traitValue]),
  ) as API.ImageProps

  return (
    <Box
      pad='medium'
      margin='small'
      align='center'
      border='all'
      round='medium'
      animation='fadeIn'
      height='medium'
      width='medium'
      elevation='small'
    >
      <Text>
        Gen {generation.id} | Dragon {id}
      </Text>
      <Text>Name: {nickname}</Text>
      <DragonImage {...normalizedTraits} />
      {showPrice && (
        <>
          <Text>sale price: {dragon.saleValue}</Text>
          <Text>sire price: {dragon.sireValue}</Text>
        </>
      )}
    </Box>
  )
}

export default Dragon
