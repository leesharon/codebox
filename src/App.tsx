import { Route, Routes, Navigate } from 'react-router-dom'
import styled from 'styled-components'
import './styles/global.scss'
import { AppHeader } from './components/AppHeader'

function App() {

  return (
    <AppContainer>
      <AppHeader />
      <MainContainer>
        <Routes>
          <Route path='/user/:status' element={<h1>codebox</h1>} />
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
