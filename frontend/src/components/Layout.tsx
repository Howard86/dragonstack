import React, { FC, ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import {
  Main,
  Box,
  Header,
  Footer,
  Anchor,
  Nav,
  Heading,
  Button,
} from 'grommet'
import { Home, Github, Basket, Money } from 'grommet-icons'

import { updateAuthHeader, logout } from '@/api'
import NavItem from './commons/NavItem'

const Layout: FC<ReactNode> = ({ children }) => {
  const router = useRouter()
  const cookies = parseCookies({})

  const { jwt = '' } = cookies

  useEffect(() => {
    updateAuthHeader(jwt)
  }, [jwt])

  const handleOnClick = () => {
    logout()
    router.push('/')
  }

  return (
    <Box fill flex>
      <Header background='neutral-2' alignContent='stretch' direction='row'>
        <Nav direction='row-responsive' flex justify='between'>
          <Box margin='auto' pad='small'>
            <Link href='/' passHref>
              <Anchor label='DragonStack' size='large' />
            </Link>
          </Box>
          {jwt && (
            <>
              <Box direction='row-responsive' flex margin='auto'>
                <NavItem to='/' icon={<Home />} label='Home' />
                <NavItem to='/info' icon={<Basket />} label='Info' />
                <NavItem to='/public' icon={<Money />} label='Public' />
              </Box>
              <Box margin='auto' alignSelf='end' pad='small'>
                <Button label='Log Out' onClick={handleOnClick} />
              </Box>
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
