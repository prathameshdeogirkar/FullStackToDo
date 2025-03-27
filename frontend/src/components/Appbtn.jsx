import React from 'react'

const Appbtn = ({title="your tittle ",veriant="simple_Pink",onClick}) => {

 let veriants = {
     simple_Blue:'bg-blue-500 hover:bg-blue-700',
     simple_Red:'bg-red-500 hover:bg-red-700',
     simple_Green:'bg-green-500 hover:bg-green-700',
     simple_Yellow:'bg-yellow-500 hover:bg-yellow-700',
     simple_Purple:'bg-purple-500 hover:bg-purple-700',
     simple_Pink:'bg-pink-500 hover:bg-pink-700',
 }

  return (
         <button className={`text-2xl font-bold ${veriants[veriant]} w-full h-full myShadow`}>{title}</button>
  )
}

export default Appbtn