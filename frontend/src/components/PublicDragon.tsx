import React, { FC, useState } from 'react'
import { Box, Button, Text, DropButton } from 'grommet'
import { useRouter } from 'next/router'

import { buyDragon, mateDragon } from '@/api'
import Dragon from './Dragon'
import useAccount from '@/hooks/useAccount'
import useDragons from '@/hooks/useDragon'

const PublicDragon: FC<API.Dragon> = (props) => {
  const [status, setStatus] = useState('')
  const { dragons, isError, isLoading } = useDragons('dragons')
  const { info } = useAccount()
  const router = useRouter()

  const { username } = props.account

  const handleEvent = (fn: Promise<API.Dragon>) => {
    fn.then(() => {
      setStatus('Success')
      alert('Success')
      router.push('/info')
    }).catch((err) => {
      setStatus(err.message)
    })
  }

  const isLoaded = !isError && !isLoading
  const hasDragons = isLoaded && dragons.length > 0

  return (
    <Box align='center' margin={{ vertical: 'small' }} gap='small'>
      <Dragon key={`dragon-${props.id}`} dragon={props} showPrice />
      <Text size='small'>owned by {username}</Text>
      <Box direction='row' gap='small'>
        <Button
          label='buy'
          onClick={() => handleEvent(buyDragon(props.id))}
          disabled={info.username === username}
        />
        <DropButton
          label='mate'
          disabled={!hasDragons}
          dropAlign={{ bottom: 'top', right: 'right' }}
          dropContent={
            <>
              {isLoaded &&
                dragons.map((dragon) => (
                  <Button
                    primary
                    plain
                    margin='xsmall'
                    key={`${props.id}-${dragon.id}`}
                    label={`-G${dragon.generation.id} | D${dragon.id} | ${dragon.nickname}-`}
                    onClick={() => handleEvent(mateDragon(dragon.id, props.id))}
                  />
                ))}
            </>
          }
        />
      </Box>
      {status && <Text>Transaction {status}</Text>}
    </Box>
  )
}

export default PublicDragon
