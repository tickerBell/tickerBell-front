"use client";

import React, { useState } from "react";
import axios from "axios";
import Button from "@/components/button/Button";
import EventDetailModal from "@/components/portalModal/eventDetailModal/EventDetailModal";

const Index = (data: any) => {
  console.log("dd", data);
  const [modal, setModal] = useState(false);

  return (
    <>
      <div>
        {modal && (
          <EventDetailModal
            className="w-400"
            dimClick={false}
            setOnModal={() => setModal(false)}
          />
        )}
      </div>
      <div className="flex lg:flex-row flex-col justify-center">
        <div className="flex flex-col lg:w-1/2 md:w-8/12 w-full lg:px-8 lg:py-14 py-8 md:py-10 border-t bg-white lg:h-screen h-auto">
          <p className="lg:text-4xl text-3xl font-black leading-10 text-gray-800 pt-3">
            제목영역
          </p>
          <img
            src="	http://placehold.it/800x600/ffff00
                "
            alt=""
            className="w-3/4 object-center object-cover"
          />
          <p>제목</p>
          <p>장소</p>
          <p>공연시간</p>
          <p>관람연령</p>
        </div>
        <div className="lg:w-1/4 md:w-8/12 w-full shadow h-full flex flex-col lg:h-screen lg:px-8 md:px-7 px-4 lg:py-20 md:py-10 py-6">
          <p className="lg:text-4xl text-3xl font-black leading-9 text-gray-800">
            구매제목
          </p>
          <p className="text-2xl leading-normal text-gray-800">총액</p>
          <p className="text-2xl font-bold leading-normal text-right text-gray-800">
            000,000원
          </p>
          <Button className="w-full" onClick={() => setModal(true)}>
            예약하기
          </Button>
        </div>
      </div>
    </>
  );
};

export default Index;

// NOTE 추후에 api가 나온다면 params로 받기
// export async function getStaticPaths() {
// const { data: posts } = await axios.get(`${ROOT_API}/todos`);

// const paths = posts.map((post: any) => ({
//   params: { id: post.id.toString() },
// }));

// return {
//   paths,
//   fallback: true,
// };
// }

// export async function getStaticProps({ params }: any) {
// const { data: todoItem } = await axios.get(`${ROOT_API}/todos/${params.id}`);

// return {
//   props: {
//     todoItem
//   },
//   revalidate: 60,
// };
// }
