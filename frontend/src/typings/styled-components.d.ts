import { grommet as grommetTheme } from 'grommet'

type CustomTheme = typeof grommetTheme

declare module 'styled-components' {
  type DefaultTheme = CustomTheme
}
