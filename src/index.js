import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AppProvider } from './components/context/context'
import AuthContextComponent from "./components/context/authContext"
ReactDOM.render(
  <React.StrictMode>
    <AuthContextComponent>
    <AppProvider>
      <App />
    </AppProvider>
    </AuthContextComponent>
  </React.StrictMode>,
  document.getElementById('root')
);

