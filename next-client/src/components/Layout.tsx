import React, { FC, ReactNode } from 'react'
import Link from 'next/link'
import { Main, Box, Header, Footer, Text, Anchor, Nav, Heading } from 'grommet'
import { Home, User, Github, Basket, Money } from 'grommet-icons'

const Layout: FC<ReactNode> = ({ children }) => (
  <Box fill>
    <Header background='neutral-2' alignContent='stretch' direction='row'>
      <Nav direction='row' pad='medium' justify='evenly'>
        <Link href='/' passHref>
          <Anchor icon={<Home />} label='Home' />
        </Link>
        <Link href='/login' passHref>
          <Anchor icon={<User />} label='Login' />
        </Link>
        <Link href='/info' passHref>
          <Anchor icon={<Basket />} label='Info' />
        </Link>
        <Link href='/public' passHref>
          <Anchor icon={<Money />} label='public' />
        </Link>
      </Nav>
    </Header>
    <Main pad='medium' flex>
      <Box margin='small' align='center'>
        <Heading>DragonStack</Heading>
      </Box>
      <Box>{children}</Box>
    </Main>
    <Footer alignSelf='center' pad='small'>
      <Text>DragonStack from howard86</Text>
      <Github />
    </Footer>
  </Box>
)

export default Layout
