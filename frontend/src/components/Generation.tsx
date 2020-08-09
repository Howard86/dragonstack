import useSWR from 'swr'
import moment from 'moment'
import React, { FC } from 'react'
import { Box, Clock, Paragraph } from 'grommet'
import { StatusWarning } from 'grommet-icons'

import { fetcher } from '@/api'
import Spinner from './commons/Spinner'

const Generation: FC = () => {
  const { data, error } = useSWR<API.Optional<API.Generation>>(
    'generations',
    fetcher,
    {
      onSuccess: (data, _key, config) => {
        const expiredSeconds = new Date(data.expiration).valueOf()
        const now = new Date().valueOf()
        config.refreshInterval = expiredSeconds - now + 1000
      },
    },
  )

  if (error) {
    return <StatusWarning />
  }

  if (!data) {
    return <Spinner />
  }

  return (
    <Box align='center'>
      <Paragraph>Generation {data.id}</Paragraph>
      <Paragraph>
        Expires at {moment(data.expiration).format('hh:mm:ss')}
      </Paragraph>
      <Paragraph>Current Time is </Paragraph>
      <Clock type='digital' />
    </Box>
  )
}

export default Generation
