import React, { FC } from 'react'
import { Box, Text } from 'grommet'
import { StatusWarning } from 'grommet-icons'

import Spinner from '@/components/commons/Spinner'
import PublicDragon from '@/components/PublicDragon'
import useDragons from '@/hooks/useDragon'
import useAccount from '@/hooks/useAccount'

const PublicDragonPage: FC = () => {
  const dragonData = useDragons('dragons/public')
  const accountData = useAccount()

  if (dragonData.isLoading || accountData.isLoading) {
    return <Spinner />
  }

  if (dragonData.isError || accountData.isError) {
    return <StatusWarning />
  }

  return (
    <Box align='center' pad='medium' margin='0 auto'>
      <Box round border margin='small' pad='small' justify='evenly'>
        <Text>{`Hi ${accountData.info.username}`}</Text>
        <Text>{`Your balance is ${accountData.info.balance}`}</Text>
      </Box>
      <Box justify='start' direction='row' flex='shrink' wrap align='center'>
        {dragonData.dragons.map((dragon) => (
          <PublicDragon key={`dragon-${dragon.id}`} {...dragon} />
        ))}
      </Box>
    </Box>
  )
}

export default PublicDragonPage
