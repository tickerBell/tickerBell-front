"use client";
export const dynamic = "force-dynamic";

import { userSelector } from "@/recoil/user";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import ModalFrame from "../ModalFrame";
import { locationSelector } from "@/recoil/locate";

type MapModalType = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  dimClick?: boolean;
  isDim?: boolean;
  onClose?: boolean;
  className?: string;
  locate?: string;
};

const MapModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  locate
}: MapModalType) => {
  const getLocation = useRecoilValue(locationSelector);
  const [route, setRoute] = useState([]);
  const [errorText, setErrorText] = useState('');

  console.log("user 스토어", getLocation.latitude, getLocation.longitude, locate);

  // NOTE: 임시조치 - next.config.js의 배포와 충돌
  // api 폴더의 dynamic 옵션끄기
  useEffect(() => {
    // 주소로 위도 경도 찾기 - 목적지
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/naver-api/path`, {
        // query: `서울 관악구 관악로 1`,
        query: `${locate} || 서울 관악구 관악로 1`,
        start: `${getLocation.latitude},${getLocation.longitude}`
      })
      // 경로 탐색
      .then((response) => {
        // console.log('res', response.data.data.route.tracomfort[0].path)
        console.log('길찾기', response.data.data.code );
        if (response.data.data.code === 2) {
          setErrorText(response.data.data.message);
        }
        // setRoute(response.data.data.route.tracomfort[0].path);
      })
      .catch((err) => console.log('err', err));

  }, [getLocation])

  useEffect(() => {
    if (route.length > 0) {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(
          getLocation.latitude,
          getLocation.longitude
        ), // 초기 지도 중심 좌표 설정
        zoom: 14, // 초기 줌 레벨 설정 - 높을수록 확대
      });

      // 경로를 표시할 Polyline 추가
      const polyline = new window.naver.maps.Polyline({
        map,
        path: route,
        strokeColor: "#ff0000", // 선 색상
        strokeWeight: 3, // 선 굵기
      });

      const path = route.map((coordPair) => {
        const [latitude, longitude] = coordPair;
        return new window.naver.maps.LatLng(longitude, latitude);
      });

      // 출발지, 경유지, 도착지 마커 추가
      const markers = route
        .map((coordinate, index) => {
          if (index === 0 || index === path.length - 1) {
            return new window.naver.maps.Marker({
              position: coordinate,
              map,
            });
          }
          return null;
        })
        .filter((marker) => marker !== null);

      return () => {
        // 컴포넌트가 언마운트되면 지도 객체를 정리
        markers.forEach((marker: any) => marker.setMap(null));
        polyline.setMap(null);
      };
    }
  }, [route, getLocation]);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      지도
      {route.length <= 0 && errorText === '' && <div>경로 탐색중입니다..</div>}
      {errorText != '' && <div>{errorText}</div>}
      {/* <button onClick={test}> 주소 입력시 위도 경도 가져오기</button> */}
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
    </ModalFrame>
  );
};

export default MapModal;
