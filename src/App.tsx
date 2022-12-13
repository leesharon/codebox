import { Route, Routes, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import './styles/global.scss'
import { AppHeader } from './components/AppHeader'
import { Authentication } from 'views/Authentication'
import { useState } from 'react'
import { User } from 'models/user.interface'

function App() {
  const [loggedinUser, setLoggedinUser] = useState<User>()

  return (
    <AppContainer>
      <AppHeader />
      <MainContainer>
        <Routes>
          <Route path='/user/:status' element={<Authentication setLoggedinUser={setLoggedinUser} />} />
          <Route path='/lobby' element={<h1>Lobby</h1>} />
          <Route path="*" element={<Navigate to='/user/login' replace />} />
        </Routes>
      </MainContainer>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

const MainContainer = styled.main`
  flex: 1;
  background-color: ${({ theme: { blackPrimary } }) => blackPrimary};
  color: white;
`

export default App
