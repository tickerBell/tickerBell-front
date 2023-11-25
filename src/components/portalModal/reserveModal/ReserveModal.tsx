import React from "react";
import ModalFrame from "../ModalFrame";
import ModalContent from "../modalItem/ModalContent";
import ModalTitle from "../modalItem/ModalTitle";
import { useQuery } from "@tanstack/react-query";
import { getEventIdApi } from "@/api/events";
import Image from "next/image";
import { day } from "@/util/day";
import PlaceButton from "@/components/button/PlaceButton";

type ReserveModalType = {
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>;
  dimClick?: boolean;
  isDim?: boolean;
  onClose?: boolean;
  className?: string;
  eventId?: any;
};

const ReserveModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  eventId
}: ReserveModalType) => {

  console.log('모달', eventId);
  const { data, isSuccess, isError, error, isFetched } = useQuery({
    queryKey: ["event-reservelist-id", eventId],
    queryFn: () => getEventIdApi(eventId),
    enabled: eventId !== null,
  });

  // const { name, startEvent, normalPrice, castings, place, isAAdult, category, thumbNailUrl } = data?.data;

  // console.log('name', name);

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      <ModalTitle>
        {data?.data.name}
      </ModalTitle>

      <ModalContent>
        <div className="flex flex-row">
          <div className="w-300 relative overflow-hidden">
            <Image src={data?.data.thumbNailUrl} alt={data?.data.name} layout="fill"
              objectFit="cover" />
          </div>
          <div>공연기간 {day(data?.data.startEvent)}</div>
          <div>관람연령 {data?.data.isAAdult ? '성인' : '미성년'}</div>
          <div>캐스팅
            {data?.data.castings.map((item: any, index: any) => (
              <span key={index}>{item}</span>
            ))}
          </div>
          <div>장소 <PlaceButton>{data?.data.place}</PlaceButton></div>
        </div>
      </ModalContent>
    </ModalFrame>
  );
};

export default ReserveModal;
