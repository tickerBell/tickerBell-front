'use clent';

import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Menu from './Menu';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex items-center justify-between h-40'>
      <Link href="/">로고</Link>
      <SearchBar />
      <Menu />
    </header>
  )
}

export default Header