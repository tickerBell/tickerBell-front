"use client";

import { postEventApi } from "@/api/events";
import { imageUrlsState, thumbnailUrlState } from "@/recoil/event";
import { getCookie } from "@/util/authCookie";
import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import React, { useEffect, useState, KeyboardEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { Images } from "./images";
import { Radio } from "./Input";

// 이벤트 폼 컴포넌트 정의
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

  // dayjs 초기화
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
  const tagsValue = watch("tags");
  const castingValue = watch("castings");
  const hostValue = watch("hosts");

  // 새 태그를 추가하는 함수입니다.

  const addTag = (tagName: string): void => {
    if (tagName && tagName.length >= 2) {
      // 태그 이름의 유효성 검사
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

  const onSubmit = async (onData: FormData): Promise<void> => {
    const tagNames = onData.tags.map((tag) => tag.name);
    const castingNames = onData.castings.map((casting) => casting.name);
    const hostNames = onData.hosts.map((host) => host.name);
    const payload = {
      startEvent: dayjs(onData.startEvent).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      endEvent: dayjs(onData.endEvent).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      name: onData.name,
      tags: tagNames,
      castings: castingNames,
      hosts: hostNames,
      place: onData.place,
      category: onData.category,
      isAdult: onData.isAdult,
      normalPrice: onData.normalPrice,
      premiumPrice: onData.premiumPrice,
      saleDegree: onData.saleDegree,
      availablePurchaseTime: dayjs(onData.availablePurchaseTime).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      ),
      isSpecialA: onData.isSpecialA,
      isSpecialB: onData.isSpecialB,
      isSpecialC: onData.isSpecialC,
      thumbnailUrl: thumbnailUrl,
      imageUrls: imageUrls,
    };
    console.log("tagNames", tagNames);
    console.log("dd", payload);

    try {
      const response = await postEventApi(atk, payload); // atk는 상태 또는 적절한 소스에서 가져온 인증 토큰입니다.
      console.log(response); // 응답 확인
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

            <div className="flex flex-row gap-12">
              <div>
                <label
                  htmlFor="startEvent"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  시작일
                </label>
                <div>
                  {/* 시작일 선택 */}
                  <Controller
                    control={control}
                    name="startEvent"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        id="startEvent"
                        className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                        showTimeSelect
                        dateFormat="yy년 MM월 dd일 aa h시 mm분"
                        selected={
                          field.value ? dayjs(field.value).toDate() : null
                        }
                        onChange={(date) =>
                          field.onChange(dayjs(date).toDate())
                        }
                        minDate={new Date(watch("startEvent"))}
                        maxDate={
                          watch("startEvent")
                            ? new Date(
                                dayjs(watch("startEvent"))
                                  .add(3, "weeks")
                                  .toDate()
                              )
                            : null
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  종료일
                </label>
                <div>
                  {/* 종료일 선택 */}
                  <Controller
                    control={control}
                    name="endEvent"
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                        showTimeSelect
                        dateFormat="yy년 MM월 dd일 aa h시 mm분"
                        selected={
                          field.value ? dayjs(field.value).toDate() : null
                        }
                        onChange={(date) =>
                          field.onChange(dayjs(date).toDate())
                        }
                        minDate={
                          watch("startEvent")
                            ? new Date(watch("startEvent"))
                            : undefined
                        }
                        maxDate={
                          watch("startEvent")
                            ? new Date(
                                dayjs(watch("startEvent"))
                                  .add(3, "weeks")
                                  .toDate()
                              )
                            : undefined
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  구매 가능 시간
                </label>
                <Controller
                  control={control}
                  name="availablePurchaseTime"
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                      showTimeSelect
                      dateFormat="yy년 MM월 dd일 aa h시 mm분"
                      selected={
                        field.value ? dayjs(field.value).toDate() : null
                      }
                      onChange={(date) => field.onChange(dayjs(date).toDate())}
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
                  )}
                />

                {errors.availablePurchaseTime && (
                  <p>{errors.availablePurchaseTime.message}</p>
                )}
              </div>
            </div>

            {/* 이벤트 태그 */}
            <div>
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                이벤트태그
              </label>
              <input
                id="tags"
                name="tags"
                placeholder="이벤트 태그를 입력하고 엔터를 누르세요"
                className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                onKeyDown={(e) => handleKeyDown(e, addTag)}
              />
            </div>
            <div className="flex flex-row ">
              {tagsFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-center space-x-2 mt-2"
                >
                  <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900">
                    {field.name}
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="text-black bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                    >
                      x
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* 이벤트 캐스팅 */}
            <div>
              <label
                htmlFor="castings"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                배우명
              </label>
              <input
                id="castings"
                name="castings"
                type="text"
                placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addCasting)}
                className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              />
              <div className="flex flex-row ">
                <p className="flex item-center">출연자:</p>
                {castingsFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900">
                      {field.name}
                      <button
                        type="button"
                        onClick={() => removeCasting(index)}
                        className="text-black bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* 이벤트 호스트 */}
            <div>
              <label
                htmlFor="hosts"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                주최자명
              </label>
              <input
                id="hosts"
                name="hosts"
                placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addHost)}
                className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
              />
              <div className="flex flex-row ">
                주최자:
                {hostsFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center space-x-2 mt-2"
                  >
                    <div className="bg-gray-100 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900">
                      {field.name}
                      <button
                        type="button"
                        onClick={() => removeHost(index)}
                        className="text-black bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center"
                      >
                        x
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
                <input
                  className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
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
            <div className="flex flex-col ">
              <label>성인여부</label>
              <div className="flex flex-row gap-12">
                <Controller
                  control={control}
                  name="isAdult"
                  render={({ field }) => (
                    <>
                      <Radio
                        key="adult"
                        name={field.name}
                        id="adult"
                        value="성인"
                        label="성인"
                        onChange={() => field.onChange(true)}
                        checked={field.value === true}
                      />
                      <Radio
                        key="non-adult"
                        name={field.name}
                        id="non-adult"
                        value="미성년"
                        label="미성년"
                        onChange={() => field.onChange(false)}
                        checked={field.value === false}
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span>카테고리</span>
              <div className="flex flex-row gap-12 ">
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <>
                      {["MUSICAL", "CONCERT", "PLAY", "CLASSIC", "SPORTS"].map(
                        (option) => {
                          const labelClass =
                            field.value === option
                              ? "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-blue-500"
                              : "group hover:bg-gray-50 flex items-center justify-between px-4 py-2 border-2 rounded-lg cursor-pointer text-sm border-gray-200";

                          return (
                            <label key={option} className={labelClass}>
                              <Radio
                                key={option}
                                name={field.name}
                                id={option}
                                value={option}
                                label={option}
                                onChange={(e) =>
                                  field.onChange(
                                    (e.target as HTMLInputElement).value
                                  )
                                }
                                checked={field.value === option}
                              />
                            </label>
                          );
                        }
                      )}
                    </>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row gap-12">
              <div>
                <label htmlFor="normalPrice">일반 가격</label>
                <input
                  className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                  id="normalPrice"
                  {...register("normalPrice")}
                  type="number"
                />
                {errors.normalPrice && <p>{errors.normalPrice.message}</p>}
              </div>
              <div>
                <label htmlFor="premiumPrice">프리미엄 가격</label>
                <input
                  className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                  id="premiumPrice"
                  {...register("premiumPrice")}
                  type="number"
                />
                {errors.premiumPrice && <p>{errors.premiumPrice.message}</p>}
              </div>
              <div>
                <label htmlFor="saleDegree">할인 금액</label>
                <input
                  className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 "
                  id="saleDegree"
                  {...register("saleDegree")}
                  type="number"
                />
                {errors.saleDegree && <p>{errors.saleDegree.message}</p>}
              </div>
            </div>

            <div className="flex flex-row item-center">
              <div>
                <label htmlFor="isSpecialA">특별 옵션 A</label>
                <input
                  id="isSpecialA"
                  {...register("isSpecialA")}
                  type="checkbox"
                />
              </div>
              <div>
                <label htmlFor="isSpecialB">특별 옵션 B</label>
                <input
                  id="isSpecialB"
                  {...register("isSpecialB")}
                  type="checkbox"
                />
              </div>
              <div>
                <label htmlFor="isSpecialC">특별 옵션 C</label>
                <input
                  id="isSpecialC"
                  {...register("isSpecialC")}
                  type="checkbox"
                />
              </div>
            </div>
            <Images {...imageHandlers} />
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

//   const onSubmit = async (data: FormData) => {
//     console.log("dd", data);
//     if (!data.startEvent) {
//       alert("시작일은 필수 입력입니다.");
//       return;
//     }

//     if (!data.endEvent) {
//       alert("종료일은 필수 입력입니다.");
//       return;
//     }

//     if (!fileUrl) {
//       alert("첨부파일은 필수 입력입니다.");
//       return;
//     }

//     data.castings = castingsValues;
//     data.hosts = hostsValues;
//     data.fileUrl = fileUrl;
//     setCastingsValues([]);
//     setHostsValues([]);

//     postEventApi(data);
// }

//   const [previewVisible, setPreviewVisible] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [fileUrl, setFileUrl] = useState<string | null>(null);

{
  /* <div
              {...getRootProps()}
              className={classNames("w-full p-3 cursor-pointer", {
                "h-auto": previewVisible,
                "h-50 border-black border rounded": !previewVisible,
              })}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>파일을 여기에 놓으세요...</p>
              ) : (
                <>
                  {previewVisible ? (
                    <div>
                      <button
                        onClick={removePreview}
                        className="bg-red-500 text-black p-1"
                      >
                        Remove
                      </button>
                      <picture className="block w-200 h-200 border border-black">
                        <img
                          src={previewUrl}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </picture>
                    </div>
                  ) : (
                    <p>
                      파일을 이곳에 드래그 앤 드롭하거나 클릭하여 선택하세요.
                    </p>
                  )}
                </>
              )}
            </div> */
}
