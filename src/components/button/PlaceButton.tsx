'use client';

import React, { useState } from 'react'
import MapModal from '../portalModal/mapModal/MapModal';
import { useRecoilValue } from 'recoil';
import { userSelector } from '@/recoil/user';
import { locationSelector } from '@/recoil/locate';

type placeButtonType = {
  type?: string;
  children: React.ReactNode;
  locate?: string;
}

const PlaceButton = ({ type, children, locate }: placeButtonType) => {
  const [show, setShow] = useState(false);
  const getLocation = useRecoilValue(locationSelector);

  console.log('왜없음', getLocation.latitude)

  return (
    <>
      {show && <MapModal setOnModal={() => setShow(false)} locate={locate} className='min-w-500'/>}
      <span onClick={() => setShow(true)} className='cursor-pointer'>
        {children}
      </span>
    </>
  )
}

export default PlaceButton