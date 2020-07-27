import React, { FC, useState } from 'react'
import { Box, Button } from 'grommet'

import Dragon from '@/components/Dragon'
import Generation from '@/components/Generation'
import { generateNewDragon } from '@/api'

const Home: FC = () => {
  const [dragon, setDragon] = useState<API.Dragon | undefined>(undefined)

  const handleGetDragon = () => {
    generateNewDragon().then(setDragon).catch(alert)
  }

  return (
    <Box margin='large' align='center'>
      <Box direction='row' width='large' margin='medium' gap='medium'>
        <Box pad='medium' gap='medium'>
          <Generation />
          <Button label='Click!' onClick={handleGetDragon} />
        </Box>
        {dragon && <Dragon dragon={dragon} />}
      </Box>
    </Box>
  )
}

export default Home
