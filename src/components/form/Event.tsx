"use client";

import { postEventApi } from "@/api/events";
import { getCookie } from "@/util/authCookie";
import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import { KeyboardEvent, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import FileUpload from "./FIleUpload";
import FRInput from "./FRInput";
import { Images } from "./images";
import { Text } from "./Input";
import { InputField } from "./InputField";
import { OnDatePicker } from "./OnDatePicker";

const Event = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      tags: [],
      castings: [],
      hosts: [],
    },
  });

  dayjs.extend(weekDay);
  const [atk, setAtk] = useState("");
  const [mapOnModal, setMapOnModal] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });
  const imageHandlers = {
    thumbnailUrl,
    setThumbnailUrl,
    imageUrls,
    setImageUrls,
  };

  const {
    fields: tagsFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const {
    fields: castingsFields,
    append: appendCasting,
    remove: removeCasting,
  } = useFieldArray({
    control,
    name: "castings",
  });

  const {
    fields: hostsFields,
    append: appendHost,
    remove: removeHost,
  } = useFieldArray({
    control,
    name: "hosts",
  });

  const addTag = (tagName: string): void => {
    if (tagName && tagName.length >= 2) {
      appendTag({ name: tagName });
    }
  };
  const addCasting = (castingName: string): void => {
    if (castingName && castingName.length >= 2) {
      appendCasting({ name: castingName });
    }
  };

  const addHost = (hostName: string): void => {
    if (hostName && hostName.length >= 2) {
      appendHost({ name: hostName });
    }
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    action: (name: string) => void
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = event.currentTarget.value.trim();
      if (name) {
        action(name);
        event.currentTarget.value = "";
      }
    }
  };

  const formatDate = (date: Date | string) =>
    dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");

  const onSubmit = async (onData: FormData): Promise<void> => {
    const tagNames = onData.tags.map((tag) => tag.name);
    const castingNames = onData.castings.map((casting) => casting.name);
    const hostNames = onData.hosts.map((host) => host.name);

    const payload = {
      startEvent: formatDate(onData.startEvent),
      endEvent: formatDate(onData.endEvent),
      availablePurchaseTime: formatDate(onData.availablePurchaseTime),
      tags: tagNames,
      castings: castingNames,
      hosts: hostNames,
      place: onData.place,
      category: onData.category,
      isAdult: onData.isAdult,
      normalPrice: onData.normalPrice,
      premiumPrice: onData.premiumPrice,
      saleDegree: onData.saleDegree,
      isSpecialA: onData.isSpecialA,
      isSpecialB: onData.isSpecialB,
      isSpecialC: onData.isSpecialC,
      thumbnailUrl: thumbnailUrl,
      imageUrls: imageUrls,
    };
    console.log("dd", payload);

    try {
      const response = await postEventApi(atk, payload);
      console.log(response);
    } catch (error) {
      console.error("이벤트 등록 실패:", error);
    }
  };

  useEffect(() => {
    const ticketAtk = getCookie("ticket-atk");
    if (ticketAtk !== atk) {
      setAtk(ticketAtk);
    }
  }, [atk]);

  // 컴포넌트 반환
  return (
    <>
      <div className="w-full mt-12 flex flex-col justify-center sm:py-12 shadow gap-52 ">
        <div className="w-2/3 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            {mapOnModal && (
              <SearchMapModal
                className="w-900 px-30 py-50"
                setOnModal={() => setMapOnModal(false)}
                company={enroll_company}
                setCompany={setEnroll_company}
              />
            )}
            <div className="flex items-center space-x-5">
              <div className="h-32 w-32 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                i
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Create an Event</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  시작날짜는 최소 2주 뒤부터 설정 가능합니다
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                이벤트명
              </label>
              <input
                className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                id="name"
                placeholder="입력해주세요"
                maxLength={5}
                {...register("name", {
                  required: "이벤트명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
              />
            </div>
            {/* 시작일 선택 */}
            <div className="flex flex-row gap-12">
              <div>
                <label
                  htmlFor="startEvent"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  시작일
                </label>
                <div>
                  <OnDatePicker
                    control={control}
                    name="startEvent"
                    minDate={dayjs().subtract(2, "weeks").toDate()}
                    maxDate={dayjs().add(3, "weeks").toDate()}
                  />
                </div>
              </div>
              {/* 종료일 선택 */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  종료일
                </label>
                <div>
                  <OnDatePicker
                    control={control}
                    name="endEvent"
                    minDate={
                      watch("startEvent")
                        ? dayjs(watch("startEvent")).toDate()
                        : undefined
                    }
                    maxDate={
                      watch("startEvent")
                        ? new Date(
                            dayjs(watch("startEvent")).add(3, "weeks").toDate()
                          )
                        : undefined
                    }
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  구매 가능 시간
                </label>
                <OnDatePicker
                  control={control}
                  name="availablePurchaseTime"
                  minDate={
                    watch("startEvent")
                      ? new Date(
                          dayjs(watch("startEvent"))
                            .subtract(2, "weeks")
                            .toDate()
                        )
                      : undefined
                  }
                  maxDate={new Date()}
                />
              </div>
            </div>
            <div>
              <InputField
                id="tags"
                name="tags"
                label="이벤트태그"
                placeholder="이벤트 태그를 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addTag)}
                fields={tagsFields}
                remove={removeTag}
              />
              <InputField
                id="castings"
                name="castings"
                label="배우명"
                placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addCasting)}
                fields={castingsFields}
                remove={removeCasting}
              />
              <InputField
                id="hosts"
                name="hosts"
                label="주최자명"
                placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addHost)}
                fields={hostsFields}
                remove={removeHost}
              />
            </div>
            <div className="mb-10">
              <label
                htmlFor="place"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                주소
              </label>
              <div className="mb-10 flex flex-row gap-12 ">
                <div className="mb-10">
                  <Button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapOnModal(true);
                    }}
                  >
                    검색
                  </Button>
                </div>
                <Text
                  className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
                  type="text"
                  id="place"
                  maxLength={5}
                  {...register("place", {
                    required: "주소는 필수 입력입니다.",
                    minLength: {
                      value: 5,
                      message: "2자리 이상 입력해주세요.",
                    },
                  })}
                  value={enroll_company.address}
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-row ">
              <label>성인여부</label>
              <div className="flex flex-row gap-12">
                <label>
                  <FRInput
                    {...register("isAdult")}
                    type="radio"
                    value="true"
                    id="adult"
                  />
                  성인
                </label>
                <label>
                  <FRInput
                    {...register("isAdult")}
                    type="radio"
                    value="false"
                    id="non-adult"
                  />
                  미성년
                </label>
              </div>
            </div>
            <div className="flex flex-col">
              <span>카테고리</span>
              <div className="flex flex-row gap-12">
                {["MUSICAL", "CONCERT", "PLAY", "CLASSIC", "SPORTS"].map(
                  (category) => {
                    const selectedCategory = watch("category");
                    const isSelected = selectedCategory === category;
                    const borderClass = isSelected
                      ? "border-blue-500"
                      : "border-gray-200";
                    return (
                      <label
                        key={category}
                        className={`group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm ${borderClass} cursor-pointer`}
                      >
                        <FRInput
                          {...register("category")}
                          label={category}
                          id={category}
                          type="radio"
                          value={category}
                        />
                      </label>
                    );
                  }
                )}
              </div>
            </div>
            <div className="flex flex-row gap-12">
              <FRInput
                {...register("normalPrice")}
                label="일반 가격"
                id="normalPrice"
              />
              <FRInput
                {...register("premiumPrice")}
                label="프리미엄 가격"
                id="premiumPrice"
              />
              <FRInput
                {...register("saleDegree")}
                label="할인 금액"
                id="saleDegree"
              />
            </div>
            <div className="flex flex-row item-center">
              <FRInput
                {...register("isSpecialA")}
                label="특별 옵션 A"
                id="isSpecialA"
                type="checkbox"
              />
              <FRInput
                {...register("isSpecialB")}
                label="특별 옵션 B"
                id="isSpecialB"
                type="checkbox"
              />
              <FRInput
                {...register("isSpecialC")}
                label="특별 옵션 C"
                id="isSpecialC"
                type="checkbox"
              />
            </div>
            <Images {...imageHandlers} />
            {/* <FileUpload /> */}
            <Button
              className="mt-20 bg-blue-700 hover:bg-blue-800"
              type="submit"
            >
              이벤트 생성
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Event;

// "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-blue-500"
//                               : "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200";
