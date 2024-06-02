import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/authContext.jsx'
import TaskProvider from './context/taskContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TaskProvider>
    <AuthProvider>
    <App />
    </AuthProvider>
    </TaskProvider>
  </React.StrictMode>,
)
