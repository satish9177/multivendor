import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Nopagefound from './components/Notpagefound.jsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Contextprovider} from './components/contextprovider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Contextprovider>
      <Routes>
        <Route path='/' element={ <App/>} />
        <Route path='/*' element={<Nopagefound/>}/>
      </Routes>
       
    </Contextprovider>
   </BrowserRouter>
  </React.StrictMode>
)
