import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './Components/GlobalContext/GlobalContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthContextProvider>
            <GlobalContextProvider>
                <App />
            </GlobalContextProvider>
        </AuthContextProvider>    
    </BrowserRouter>
)
