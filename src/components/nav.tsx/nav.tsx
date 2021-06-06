import React from 'react'
import { NavObject } from '../../util/nav-util'
import styled from 'styled-components'
import { Link } from 'gatsby'
// const Main = styled.main``

const StyledNav = styled.nav`
  background-color: #301b3f;
  width: 100%;
  display: flex;
  align-items: flex-end;
`
const StyledOl = styled.ol`
  list-style-type: none;
  padding-left: 25px;
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: #b4a5a5;
  &:after {
    display: inline-block;
    color: #000;
    content: '/';
    color: #3c415c;
    font-size: 100%;
    font-weight: bold;
    padding: 0 3px;
  }
`
const StyledLi = styled.li`
  display: inline-block;
`
interface Props {
  navs: NavObject[]
}

export default function Nav({ navs }: Props) {
  return (
    <StyledNav>
      <StyledOl>
        {navs.map((nav, i) => (
          <StyledLi key={nav.title + i} id={nav.title}>
            <StyledLink to={nav.path}>{nav.title}</StyledLink>
          </StyledLi>
        ))}
      </StyledOl>
    </StyledNav>
  )
}
