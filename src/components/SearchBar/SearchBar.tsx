'use client';

import React, { useState } from 'react'
import s from './searchbar.module.scss';
import { Search34 } from '../images';

const SearchBar = () => {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log(value);
  };

  return (
    <form className={s.searchbar} onSubmit={onSubmit}>
      <input type="text" placeholder='검색' onChange={onChange} value={value} />
      <Search34 onClick={() => {
        console.log('cc');
      }} />
    </form>
  )
}

export default SearchBar