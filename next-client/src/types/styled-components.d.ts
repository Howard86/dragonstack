import theme from '@/theme'

type CustomTheme = typeof theme

declare module 'styled-components' {
  type DefaultTheme = CustomTheme
}
