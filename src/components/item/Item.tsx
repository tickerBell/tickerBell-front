import React from 'react';
import Card from './Card';

type cardType = {
  data: any;
  type?: string;
};

const Item = ({ data, type }: cardType) => {

  return (
    <>
      {data?.length !== undefined &&
        data?.map((item: any, index:any) => (
          <Card key={index} data={item} />
        ))
      }
    </>
  )
}

export default Item