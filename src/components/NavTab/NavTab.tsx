import Link from 'next/link';
import React from 'react'

const navdata = ['뮤지컬', '콘서트', '연극', '클래식/무용', '스포츠'];

const navdata2 = [
  {
    name: '뮤지컬',
    link: '/musical'
  },
  {
    name: '콘서트',
    link: '/concert'
  },
  {
    name: '연극',
    link: '/play'
  },
  {
    name: '클래식',
    link: '/classic'
  },
  {
    name: '스포츠',
    link: '/sports'
  }
]



const NavTab = () => {
  return (
    <div className='flex gap-8'>
      {navdata2.map((item, index) => (
        <Link href={`${item.link}`} key={index}>{item.name}</Link>
      ))}
    </div>
  )
}

export default NavTab