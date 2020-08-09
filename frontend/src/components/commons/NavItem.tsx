import React, { FC } from 'react'
import Link from 'next/link'
import { Anchor, Box } from 'grommet'

type NavItemProp = {
  to: string
  label: string
  icon: JSX.Element
}

const NavItem: FC<NavItemProp> = ({ to, label, icon }) => (
  <Box pad='small'>
    <Link href={to} passHref>
      <Anchor icon={icon} label={label} />
    </Link>
  </Box>
)

export default NavItem
