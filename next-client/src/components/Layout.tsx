import React, { FC, ReactNode, useEffect } from 'react'
import { parseCookies } from 'nookies'
import { Main, Box, Header, Footer, Anchor, Nav, Heading } from 'grommet'
import { Home, User, Github, Basket, Money } from 'grommet-icons'

import { updateAuthHeader } from '@/api'
import NavItem from './commons/NavItem'

const Layout: FC<ReactNode> = ({ children }) => {
  const cookies = parseCookies({})

  const { jwt = '' } = cookies

  useEffect(() => {
    updateAuthHeader(jwt)
  }, [jwt])

  return (
    <Box fill flex>
      <Header background='neutral-2' alignContent='stretch' direction='row'>
        <Nav direction='row' flex justify='start' key='login'>
          {!jwt ? (
            <NavItem to='/' icon={<User />} label='Log In' />
          ) : (
            <>
              <NavItem to='/' icon={<Home />} label='Home' />
              <NavItem to='/info' icon={<Basket />} label='Info' />
              <NavItem to='/public' icon={<Money />} label='Public' />
            </>
          )}
        </Nav>
      </Header>
      <Main pad='medium' flex align='center'>
        <Heading>DragonStack</Heading>
        <Box>{children}</Box>
      </Main>
      <Footer alignSelf='center' pad='small'>
        <Anchor
          color='grey'
          href='https://github.com/howard86/dragonstack'
          target='_blank'
          icon={<Github />}
          label='DragonStack from howard86'
        />
      </Footer>
    </Box>
  )
}

export default Layout
