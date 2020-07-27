import React, { FC } from 'react'
import { Box } from 'grommet'
import { StatusWarning } from 'grommet-icons'

import Spinner from '@/components/commons/Spinner'
import AccountDragon from '@/components/AccountDragon'
import useDragons from '@/hooks/useDragon'

const InfoPage: FC = () => {
  const { dragons, isError, isLoading } = useDragons('dragons')

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <StatusWarning />
  }

  return (
    <Box align='center' pad='medium' margin='0 auto'>
      <Box justify='start' direction='row' flex='shrink' wrap align='center'>
        {dragons.map((dragon) => (
          <AccountDragon key={`dragon-${dragon.id}`} {...dragon} />
        ))}
      </Box>
    </Box>
  )
}

export default InfoPage
