'use client';

import { useGeoLocation } from "@/hooks/useGeoLocation";
import { userSelector, userState } from '@/recoil/user';
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24,
}

const Location = () => {
  const { location, error } = useGeoLocation(geolocationOptions);
  // set
  const setLocation = useSetRecoilState(userSelector('location'));
  // get
  const getLocation = useRecoilValue(userSelector('location'));

  useEffect(() => {
    if (location) {
      setLocation(location);
    }
  }, [location, setLocation])

  // console.log('location', location);
  // console.log('저장됨? ', getLocation);

  return null;
}

export default Location