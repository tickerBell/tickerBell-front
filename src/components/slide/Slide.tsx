// 테스트용 임시 use client;
'use client';

import React from "react";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { useMemo } from "react";
import Link from "next/link";
import { day } from "@/util/day";
import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

type sliderProps = {
  title?: string;
  data?: any;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
  viewCount?: number;
  arrow?: boolean;
};

const PrevArrow = ({ onClick }: CustomArrowProps) => {
  // const { className, style, onClick } = props;
  return (
    <div
      className="absolute top-[140px] left-[-10px] w-40 h-40 border border-1 rounded-full bg-white z-10 cursor-pointer flex items-center justify-center shadow"
      onClick={onClick}
    >
      <IoIosArrowBack size={28} className="absolute top-0 bottom-0 left-0 right-0 m-auto" />
    </div>
  );
}

const NextArrow = ({ onClick }: CustomArrowProps) => {
  return (
    <div
      className="absolute top-[140px] right-[-10px] w-40 h-40 border border-1 rounded-full bg-white z-10 cursor-pointer flex items-center justify-center shadow"
      onClick={onClick}
    >
      <IoIosArrowForward size={28} className="absolute top-0 bottom-0 left-0 right-0 m-auto" />
    </div>
  );
}

const Slide = ({
  title,
  data,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
  viewCount = 5,
  arrow = true
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      arrows: Boolean(arrow),
      centerPadding: "30px",
      infinite: loop,
      speed: speed,
      slidesToShow: Number(viewCount),
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      // gap:
    }),
    [autoplay, loop, speed]
  );

  // console.log('slidedata', data);

  return (
    <div className="mt-40">
      {data && data !== null ? (
        <>
          {title && <h4 className="text-center font-semibold text-[32px] mb-10">{title}</h4>}
          <div className={className}>
            <Slider {...settings}>
              {data?.map((item: any, index: any) => (
                <Link href={`/detail/${item.eventId}`} key={index}>
                  <div className="relative m-auto w-full h-330 border border-1 border-[#eeeeee]">
                    {
                      title === '랭킹' && <div className="absolute left-10 bottom-10 text-white z-10 font-semibold text-[50px]">{index + 1}</div>
                    }
                    <Image src={item.thumbNailUrl} alt={item.name} fill
                      objectFit='cover' />
                  </div>
                  <div className="mt-10 font-semibold text-gray-900 truncate">
                    {item.name}
                  </div>
                  <div className="text-[14px] text-gray-500">
                    {day(item.startEvent)} ~ {day(item.endEvent)}
                  </div>
                </Link>
              ))}
            </Slider>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Slide;
