import React from 'react';

const Appinput = ({ placeholder, onChange }) => {
  return (
    <div className="w-full h-full text-black">
      <input
        className="h-full w-full outline-none myShadow text-xl px-2 font-medium py-1"
        placeholder={placeholder}
        onChange={onChange} 
      />
    </div>
  );
};

export default Appinput;
