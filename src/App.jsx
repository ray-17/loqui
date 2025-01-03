import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from './pages/login/login'
import Chat from './pages/chat/chat'
import Profile_Update from './pages/profile_update/profile_update'
import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'

const App = () => {

  const navigate = useNavigate();
  const {loaduserdata} = useContext(AppContext)

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=> {
      if(user){
        navigate('/chat')
        //console.log(user);
        await loaduserdata(user.uid)
      }
      else{
          navigate('/')
      }
    })
  },[])

  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/chat' element={<Chat/>}/>
      <Route path='/profile' element={<Profile_Update/>}/>
    </Routes>
    </>
  )
}

export default App