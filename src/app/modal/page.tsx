'use client';

import Button from '@/components/button/Button';
import EventDetailModal from '@/components/portalModal/eventDetailModal/EventDetailModal';
import MapModal from '@/components/portalModal/mapModal/MapModal';
import SearchMapModal from '@/components/portalModal/mapModal/SearchMapModal';
import React, { useState } from 'react'
import { userState } from '@/recoil/user';
import { useRecoilState } from 'recoil';
import { useQuery, gql } from "@apollo/client";

const ModalPage = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: '',
  });

  // const [user] = useRecoilState(userState);
  // console.log('user 스토어', user);
  // ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ graphql 테스트
  interface Country {
    code: string;
    emoji: string;
    name: string;
  }

  interface CountryData {
    countries: Country[];
  }

  const GET_COUNTRIES = gql`
  query Countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      emoji
    }
  }
`;

  // GRAPHQL READ_BYFILTER
  const { data, loading, error } = useQuery<CountryData>(GET_COUNTRIES, {
    variables: {
      filter: {
        code: {
          eq: "AD",
        },
      },
    },
  });

  if (loading) {
    return <h2>로딩중</h2>;
  }

  if (error) {
    return <h1>에러 발생</h1>;
  }

  const countries = data?.countries.slice(0, 4);

  console.log('gql : ', countries);

  return (
    <div>
      {modal && <EventDetailModal className='w-400' dimClick={false} setOnModal={() => setModal(false)} />}
      {modal1 && <MapModal className='w-600' dimClick={false} setOnModal={() => setModal1(false)} />}
      {modal2 && <SearchMapModal
        className='w-500 px-30 py-50'
        setOnModal={() => setModal2(false)}
        company={enroll_company}
        setCompany={setEnroll_company}
      />
      }

      <Button onClick={() => setModal(true)}>예약하기</Button>
      <Button onClick={() => setModal1(true)}>지도모달</Button>
      <Button onClick={() => setModal2(true)}>주소검색</Button>
    </div>
  )
}

export default ModalPage