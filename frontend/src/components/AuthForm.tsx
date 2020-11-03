import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Box,
  TextInput,
  Button,
  Form,
  FormField,
  Anchor,
  FormExtendedEvent,
} from 'grommet'

import { login, signUp } from '@/api'

type Account = {
  username: string
  password: string
}

const DEFAULT_VALUE: Account = {
  username: '',
  password: '',
}

const AuthForm: FC = () => {
  const [value, setValue] = useState(DEFAULT_VALUE)
  const [hasAccount, setHasAccount] = useState(true)

  const handleOnSubmit = async (event: FormExtendedEvent<API.Account>) => {
    const action = hasAccount ? login : signUp
    action(event.value)
      .then(() => {
        alert('success')
        router.reload()
      })
      .catch((err) => alert(err.message))
  }

  const router = useRouter()
  return (
    <Box align='center' gap='small'>
      <Form
        value={value}
        onChange={(value: API.Account) => setValue(value)}
        onSubmit={handleOnSubmit}
        onReset={() => {
          setValue(DEFAULT_VALUE)
        }}
      >
        <FormField name='username' label='Username'>
          <TextInput id='text-input-id' name='username' />
        </FormField>
        <FormField name='password' label='Password'>
          <TextInput id='text-input-id2' name='password' type='password' />
        </FormField>
        <Box direction='row' gap='medium' pad='medium'>
          <Button
            type='submit'
            primary
            label={hasAccount ? 'Log In' : 'Sign Up'}
          />
          <Button type='reset' label='Reset' />
        </Box>
      </Form>
      <Anchor
        label={(hasAccount ? "Don't" : 'Already') + ' have an account?'}
        onClick={() => setHasAccount(!hasAccount)}
      />
    </Box>
  )
}

export default AuthForm
