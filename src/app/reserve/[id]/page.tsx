'use client';

import React, { useState } from 'react'
import axios from 'axios';
import Button from '@/components/button/Button';
import EventDetailModal from '@/components/portalModal/eventDetailModal/EventDetailModal';

const Index = (data: any) => {
  console.log('dd', data);
  const [modal, setModal] = useState(false);

  return (
    <div>
      {modal && <EventDetailModal className='w-400' dimClick={false} setOnModal={() => setModal(false)} />}
      제목
      {/* {data.title} */}
      <div>컨텐츠 영역</div>
      <div>구매정보 영역
        <Button onClick={() => setModal(true)}>예약하기</Button>
      </div>
    </div>
  )
}

export default Index

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