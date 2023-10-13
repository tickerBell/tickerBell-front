import React from "react";
import Slider, { Settings } from "react-slick";
import { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

type sliderProps = {
  data?: any;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
};

const Slide = ({
  data,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      // dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: 5,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
      // gap:
    }),
    [autoplay, loop, speed]
  );
  return (
    <div>
      슬라이드 컴포넌트
      <div className={className}>
        <Slider {...settings}>
          {data?.map((item: any, index: any) => (
            <Link href={`/reserve/${item.id}`} key={index}>
              <picture>
                <img src={item.item} alt={item.name} />
              </picture>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
