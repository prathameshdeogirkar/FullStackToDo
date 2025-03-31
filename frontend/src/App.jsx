import React, { useEffect, useState } from 'react'
import "./index.css"
import Mycalender from './components/Mycalender'
import Signup from './components/Signup'
import 'remixicon/fonts/remixicon.css'
import Login from './components/Login'
import UserIcon from './components/UserIcon'
import { ToastContainer } from 'react-toastify';
import ShowTask from './components/ShowTask'
import { loaddToken } from './utiles'



const App = () => {

  const [token, setToken] = useState(loaddToken())
  const [showcompo, setShowcompo] = useState(false)
  const [authCompo, setAuthComp] = useState(token ? false : true)
  const [showcomponent, setShowcomponent] = useState(false);
  const [closeMsg, setcloseMsg] = useState(true)

  useEffect(() => {
    setToken(loaddToken())
  }, [])

  console.log(token)
  return (

    <>
    {
      closeMsg ? <div className='h-12 w-screen bg-green-500 flex items-center justify-between absolute  z-40 px-12 text-xl'>
      <p>FOCUS ON YOUR GOALS</p>
      <i className="ri-close-fill cursor-pointer" onClick={()=>setcloseMsg(false)}></i>
    </div> : null
    }
      <div className='flex '>
        <Mycalender
          setShowcomponent={setShowcomponent}
          showcomponent={showcomponent}

        />

        <ShowTask showcomponent={showcomponent} />


        <>
          {
            authCompo ? (
              <>
                {showcompo ? (
                  <Signup setShowcompo={setShowcompo} />
                ) : (
                  <Login setShowcompo={setShowcompo} setAuthComp={setAuthComp} />
                )}
              </>
            ) : null
          }
        </>

        <UserIcon />

        <ToastContainer
          position="bottom-left"
        />
      </div >

    </>

  )
}

export default App