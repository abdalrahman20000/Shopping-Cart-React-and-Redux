import { useState } from 'react'
import ShoppingMarket from './components/shopping'
import AuthPage from './components/signUp-logIn'
import HomePage from './components/home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage></AuthPage>}></Route>
          <Route path="/shopping" element={<ShoppingMarket></ShoppingMarket>}></Route>
          <Route path="/" element={<HomePage></HomePage>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
