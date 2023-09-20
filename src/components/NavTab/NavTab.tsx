import React from 'react'

const navdata = ['뮤지컬', '콘서트', '연극', '클래식/무용', '스포츠'];


const NavTab = () => {
  return (
    <div className='flex gap-8'>
      {navdata.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  )
}

export default NavTab