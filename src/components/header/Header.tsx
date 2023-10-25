'use clent';

import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Menu from './Menu';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex items-center justify-between h-40 max-w-1280 m-auto px-20 box-border'>
      <Link href="/">로고</Link>
      <SearchBar />
      <Menu />
    </header>
  )
}

export default Header