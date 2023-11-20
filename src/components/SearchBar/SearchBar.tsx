'use client';

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import s from './searchbar.module.scss';

import { Search34 } from '../images';

const SearchBar = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue('');
    router.push(`/search?keyword=${value}`)
  };


  return (
    <form className={s.searchbar} onSubmit={onSubmit}>
      <input type="text" placeholder='검색' onChange={onChange} value={value} />
      <Search34 onClick={(e:any) => {
        console.log('cc');
        onSubmit(e);
      }} />
    </form>
  )
}

export default SearchBar