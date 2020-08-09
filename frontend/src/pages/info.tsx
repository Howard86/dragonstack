import React, { FC } from 'react'
import { Box, Anchor } from 'grommet'
import { StatusWarning } from 'grommet-icons'
import { useRouter } from 'next/router'

import Spinner from '@/components/commons/Spinner'
import AccountDragon from '@/components/AccountDragon'
import useDragons from '@/hooks/useDragon'

const OwnerDragonPage: FC = () => {
  const { dragons, isError, isLoading } = useDragons('dragons')
  const router = useRouter()

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <StatusWarning />
  }

  return (
    <Box align='center' pad='medium' margin='0 auto'>
      <Box justify='start' direction='row' flex='shrink' wrap align='center'>
        {dragons.length === 0 ? (
          <Anchor
            label='No dragons found, get your first one?'
            onClick={() => router.push('/')}
          />
        ) : (
          dragons.map((dragon) => (
            <AccountDragon key={`dragon-${dragon.id}`} {...dragon} />
          ))
        )}
      </Box>
    </Box>
  )
}

export default OwnerDragonPage
