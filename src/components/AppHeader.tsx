import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { flexAlign } from '../styles/setup/mixins'
import { MainLayout } from './Generics'

export const AppHeader = () => {
  return (
    <Header>
      <HeaderLayout>
        <Logo to="/">CodeBox</Logo>
      </HeaderLayout>
    </Header>
  )
}

const Header = styled.header`
  font-size: 20px;
  background-color: ${({ theme: { blackLight } }) => blackLight};
  color: ${({ theme: { grayPrimary } }) => grayPrimary};
  display: flex;
  justify-content: center;
  box-shadow: rgb(255 255 255 / 20%) 0px 0px 10px 0;
`

const HeaderLayout = styled(MainLayout)`
  display: flex;
`

const Logo = styled(NavLink)`
  ${flexAlign}
  transition: color 200ms ease-in-out;
  height: 60px;

  &:hover {
    color: ${({ theme: { bluePrimary } }) => bluePrimary};
  }
`