'use client';

import { useEffect } from "react";

export default function useRefresh() {

  useEffect(() => {
    const refresh = () => {
      console.log('새로고침');
    }
    refresh();
  },[]);
}