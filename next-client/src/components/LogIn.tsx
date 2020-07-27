import React, { FC, useState } from 'react'
import { Box, TextInput, Button, Form, FormField } from 'grommet'

import { login } from '@/api'

type Account = {
  username: string
  password: string
}

const DEFAULT_VALUE: Account = {
  username: '',
  password: '',
}

const LogIn: FC = () => {
  const [value, setValue] = useState(DEFAULT_VALUE)

  return (
    <Box align='center' gap='small'>
      <Form
        value={value}
        onChange={(value) => setValue(value)}
        onReset={() => setValue(DEFAULT_VALUE)}
        onSubmit={(event: any) => {
          login(event.value)
            .then(() => {
              alert('success')
            })
            .catch(console.error)
        }}
      >
        <FormField name='username' label='Username'>
          <TextInput id='text-input-id' name='username' />
        </FormField>
        <FormField name='password' label='Password'>
          <TextInput id='text-input-id2' name='password' type='password' />
        </FormField>
        <Box direction='row' gap='medium' pad='medium'>
          <Button type='submit' primary label='Submit' />
          <Button type='reset' label='Reset' />
        </Box>
      </Form>
    </Box>
  )
}

export default LogIn
