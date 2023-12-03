import { day } from "@/util/day";
import { price } from "@/util/price";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import s from "./card.module.scss";

type cardType = {
  data: any;
  type?: string;
};

const Card = ({ data, type }: cardType) => {

  // console.log('carddata', data);

  return (
    <>
      <div className="relative w-full">
        <Link href={`/detail/${data.eventId}`}>
          {data.isAdult && <span className={s.adult_tag}>18</span>}
          <div className={s.img_wrap}>
            {
              !!data.thumbNailUrl &&
              <Image
                src={data.thumbNailUrl}
                alt={data.name}
                layout="fill"
                objectFit="cover"
              />
            }
          </div>
          <div className="mt-10 truncate">{data.name}</div>
          {data.castings && (
            <div>
              {data.castings.map((item: any, i: any) => (
                <span key={i}>{item}</span>
              ))}
            </div>
          )}
          <div className="line-clamp-2">{data.place}</div>
          <div className="mt-6 mb-6">
            {day(data.startEvent)}
          </div>
          {data.saleDegree !== 0 && (
            <del className="size-[14px]">{price(data.normalPrice)}원</del>
          )}
          <div>{price(data.discountNormalPrice)}원</div>
        </Link>
      </div>
    </>
  );
};

export default Card;
