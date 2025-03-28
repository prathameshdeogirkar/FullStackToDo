import React from 'react'
import "./index.css"
import Mycalender from './components/Mycalender'
import Signup from './components/Signup'
import 'remixicon/fonts/remixicon.css'
import Login from './components/Login'
import UserIcon from './components/UserIcon'

const App = () => {
  return (
        <div className='flex '>
          <Mycalender/>
 
         {/* <Signup/>   */}
        
         {/* <Login/> */}
        </div>
  )
}

export default App