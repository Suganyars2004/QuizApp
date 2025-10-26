import React from 'react'
import Navbar from './components/Navbar'
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import { Routes,Route, useLocation } from 'react-router-dom'
import Home from './pages/Home/Home'
import MyResultPage from './pages/MyResultPage'
function RequireAuth({children}){
  const isLoggedIn=Boolean(localStorage.getItem('authToken'));
  const location=useLocation();
  if(!isLoggedIn){
    return <Navigate to='/login' state={{from:location}} replace/>

  }
  return children;
}
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<LogIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/result' element={
          <RequireAuth>
            <MyResultPage/>
          </RequireAuth>
        }/>
      </Routes>
    </div>
  )
}

export default App