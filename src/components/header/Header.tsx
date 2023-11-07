'use clent';

import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Menu from './Menu';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='box-border flex items-center justify-between w-full px-20 m-auto border-b border-red-500 h-60'>
      <div className='flex items-center gap-20 max-w-1280'>
        <Link href="/">TickerBell</Link>
        <SearchBar />
      </div>
      <Menu />
    </header>
  )
}

export default Header