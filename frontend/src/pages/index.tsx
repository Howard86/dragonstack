import React, { FC, useState } from 'react'
import { parseCookies } from 'nookies'
import { Box, Button } from 'grommet'

import Generation from '@/components/Generation'
import Dragon from '@/components/Dragon'
import AuthForm from '@/components/AuthForm'
import { generateNewDragon } from '@/api'

const HomePage: FC = () => {
  const cookies = parseCookies({})
  const { jwt } = cookies

  const [dragon, setDragon] = useState<API.Dragon | undefined>(undefined)

  const handleGetDragon = () => {
    generateNewDragon().then(setDragon).catch(alert)
  }

  return !jwt ? (
    <AuthForm />
  ) : (
    <Box flex='grow' align='center' alignContent='start'>
      <Box margin='large' align='center'>
        <Box direction='row' width='large' gap='small'>
          <Box pad='medium' gap='small'>
            <Generation />
            <Button label='Click!' onClick={handleGetDragon} />
          </Box>
          {dragon && <Dragon dragon={dragon} />}
        </Box>
      </Box>
    </Box>
  )
}

export default HomePage
