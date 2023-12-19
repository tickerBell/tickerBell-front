"use client";
"use client";

import Button from "@/components/button/Button";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";
import MapModal from "@/components/portalModal/mapModal/MapModal";
import SearchMapModal from "@/components/portalModal/mapModal/SearchMapModal";
import React, { useState } from "react";
import { userState } from "@/recoil/user";
import { useRecoilState } from "recoil";
import { useQuery, gql } from "@apollo/client";
import { onClickPayment } from "@/hooks/Payment";
import { toast } from "react-toastify";
import { SkeletonList } from "@/components/skeleton/Skeleton";

const ModalPage = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  return (
    <div>
      {/* {modal && (
        <EventDetailModal
          className="w-400"
          dimClick={false}
          setOnModal={() => setModal(false)}
        />
      )} */}
      {modal1 && (
        <MapModal
          className="w-600"
          dimClick={false}
          setOnModal={() => setModal1(false)}
        />
      )}
      {modal2 && (
        <SearchMapModal
          className="w-500 px-30 py-50"
          setOnModal={() => setModal2(false)}
          company={enroll_company}
          setCompany={setEnroll_company}
        />
      )}

      {/* <button onClick={onClickPayment}>결제</button> */}

      <Button onClick={() => setModal(true)}>예약하기</Button>
      <Button onClick={() => setModal1(true)}>지도모달</Button>
      <Button onClick={() => setModal2(true)}>주소검색</Button>
      <Button onClick={() => toast.success('성공')}>토스트 테스트</Button>
      <SkeletonList/>
    </div>
  );
};

export default ModalPage;
