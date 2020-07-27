import React, { FC, useState } from 'react'
import { Box, Button, Text } from 'grommet'
import { useRouter } from 'next/router'

import { buyDragon } from '@/api'
import Dragon from './Dragon'

const PublicDragon: FC<API.Dragon> = (props) => {
  const [status, setStatus] = useState('')
  const router = useRouter()

  const handleEvent = (fn: Promise<any>) => {
    fn.then(() => {
      setStatus('Success')
      router.push('/info')
    }).catch((err) => {
      setStatus(err.message)
    })
  }

  return (
    <Box align='center' margin={{ vertical: 'small' }} gap='small'>
      <Dragon key={`dragon-${props.id}`} dragon={props} showPrice />
      <Box direction='row' gap='small'>
        <Button label='buy' onClick={() => handleEvent(buyDragon(props.id))} />
        <Button label='mate' onClick={() => router.push('/info')} />
      </Box>
      {status && <Text>Transaction {status}</Text>}
    </Box>
  )
}

export default PublicDragon
