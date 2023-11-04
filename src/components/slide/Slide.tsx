import React from "react";
import Slider, { Settings } from "react-slick";
import { useMemo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";
import { day } from "@/util/day";

type sliderProps = {
  title?: string;
  data?: any;
  className?: string;
  autoplay?: boolean | number;
  speed?: number;
  loop?: boolean;
};

const Slide = ({
  title,
  data,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
}: sliderProps) => {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
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
      {data && data.length > 0 ? (
        <>
          {title && <h4 className="text-center">{title}</h4>}
          <div className={className}>
            <Slider {...settings}>
              {data?.map((item: any, index: any) => (
                // <div href={`/reserve/${item.eventId}`} key={index}>
                <div key={index}>
                  <picture>
                    <img src={item.item} alt={item.name} />
                  </picture>
                  {item.eventName}
                  {day(item.startEvent)}
                </div>
              ))}
            </Slider>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Slide;
