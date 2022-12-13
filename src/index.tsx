import ReactDOM from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import App from './App'
import { theme } from './styles/setup/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Router>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>
)
