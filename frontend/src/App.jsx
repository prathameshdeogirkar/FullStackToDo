import React, { useState } from 'react'
import "./index.css"
import Mycalender from './components/Mycalender'
import Signup from './components/Signup'
import 'remixicon/fonts/remixicon.css'
import Login from './components/Login'
import UserIcon from './components/UserIcon'
import { ToastContainer } from 'react-toastify';
import ShowTask from './components/ShowTask'


const App = () => {

  const [showcompo, setShowcompo] = useState(false)
  const [authCompo,setAuthComp] = useState(true)


  return (

    <div className='flex '>
      <Mycalender />

      <ShowTask />


      {
       authCompo ?
       <>
         {showcompo ? <Signup setShowcompo={setShowcompo}/> : <Login setShowcompo={setShowcompo} setAuthComp={setAuthComp}/>}
       </>
       : 
       null
      
      }

      <ToastContainer
        position="bottom-left"
      />
    </div>
  )
}

export default App