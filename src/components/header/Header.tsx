'use clent';

import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import Menu from './Menu';
import Link from 'next/link';

const Header = () => {
  return (
    <header className='flex items-center justify-between h-60 max-w-1280 m-auto px-20 box-border'>
      <div className='flex items-center gap-20'>
        <Link href="/">TickerBell</Link>
        <SearchBar />
      </div>
      <Menu />
    </header>
  )
}

export default Header