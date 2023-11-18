import { day } from "@/util/day";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type cardType = {
  data: any;
};

const Card = ({ data }: cardType) => {
  console.log("data", data);
  return (
    <div className="w-full">
      <Link href={`/detail/${data.eventId}`}>
        <Image src={data.thumbNailUrl} alt="" width={200} height={300} />
        <div>{data.name}</div>
        <div>{data.eventName}</div>
        <div>{data.place}</div>
        <div>{day(data.startEvent)}</div>
      </Link>
    </div>
  );
};

export default Card;
