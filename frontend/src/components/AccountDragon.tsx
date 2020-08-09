import React, { FC, useReducer } from 'react'
import { Box, CheckBox, Button, TextInput } from 'grommet'
import { Tooltip, FormEdit } from 'grommet-icons'

import { updateDragon } from '@/api'
import Dragon from './Dragon'
import SlideInput from './commons/SlideInput'

type Action = {
  type: 'update' | 'reset' | 'save'
  payload?: Partial<API.DragonState>
}

const init = (dragon: API.Dragon): API.DragonState => ({
  id: dragon.id,
  updated: false,
  name: dragon.nickname,
  sellingPrice: dragon.saleValue,
  matingPrice: dragon.sireValue,
  isPublic: dragon.public,
})

const reducer = (state: API.DragonState, action: Action) => {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload, updated: true }
    case 'reset':
      return action.payload
    case 'save':
      updateDragon(state)
      return { ...state, updated: false }
    default:
      throw new Error(`cannot find ${action.type}`)
  }
}

const AccountDragon: FC<API.Dragon> = (props) => {
  const [state, dispatch] = useReducer(reducer, props, init)

  const { isPublic, matingPrice, sellingPrice, updated, name } = state

  return (
    <Box gap='small' pad='small' align='center' width='medium'>
      <Dragon dragon={props} />

      <TextInput
        width='1/2'
        icon={updated ? <FormEdit /> : <Tooltip />}
        value={name}
        placeholder={name}
        onChange={(event) =>
          dispatch({
            type: 'update',
            payload: { name: event.target.value },
          })
        }
      />

      <SlideInput
        name='Selling Price'
        value={sellingPrice}
        onChange={(event) =>
          dispatch({
            type: 'update',
            payload: { sellingPrice: event.target.value },
          })
        }
      />

      <SlideInput
        name='Mating Price'
        value={matingPrice}
        onChange={(event) =>
          dispatch({
            type: 'update',
            payload: { matingPrice: event.target.value },
          })
        }
      />

      <CheckBox
        checked={isPublic}
        label='Make dragon public?'
        onChange={(event) =>
          dispatch({
            type: 'update',
            payload: { isPublic: event.target.checked },
          })
        }
      />
      <Box direction='row' gap='small'>
        <Button
          label='Save'
          disabled={!updated}
          onClick={() => dispatch({ type: 'save' })}
        />
        <Button
          label='Reset'
          disabled={!updated}
          onClick={() => dispatch({ type: 'reset', payload: init(props) })}
        />
      </Box>
    </Box>
  )
}

export default AccountDragon
