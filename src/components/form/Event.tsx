"use client";

import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { postEventApi } from "@/api/events";
import { getCookie } from "@/util/authCookie";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { Images } from "./images";
import { Radio } from "./Input";
import { useRecoilValue } from "recoil";
import { imageUrlsState, thumbnailUrlState } from "@/recoil/event";
type FormData = {
  startEvent: string;
  endEvent: string;
  name: string;
  tag: string;
  castings: string;
  hosts: string;
  place: string;
  category: string;
  isAdult: boolean;
  thumbnailUrl: string;
  imageUrls: string[];
};

// 이벤트 폼 컴포넌트 정의
const Event = () => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  // dayjs 초기화
  dayjs.extend(weekDay);
  const thumbnailUrl = useRecoilValue(thumbnailUrlState);
  const imageUrls = useRecoilValue(imageUrlsState);
  const [mapOnModal, setMapOnModal] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });
  const [atk, setAtk] = useState("");

  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log("dd", data);
    const frm = new FormData();

    frm.append("startEvent", data.startEvent);
    frm.append("endEvent", data.endEvent);
    frm.append("name", data.name);
    frm.append("tag", data.tag);
    frm.append("castings", data.castings);
    frm.append("place", data.place);
    frm.append("castings", data.castings);
    frm.append("hosts", data.hosts);
    frm.append("category", data.category);
    frm.append("isAdult", data.isAdult);
    frm.append("thumbnail", thumbnailUrl);
    imageUrls.forEach((url) => {
      frm.append("images", url);
    });
    // data.castings.forEach((casting: string) => {
    //   frm.append("castings", casting);
    // });
    try {
      const response = await postEventApi(frm);
      console.log(response); // 응답 확인
    } catch (error) {
      console.error(error);
    }
  };

  // 컴포넌트 반환
  return (
    <>
      <div className="max-w-2xl mx-auto bg-white p-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          {mapOnModal && (
            <SearchMapModal
              className="w-900 px-30 py-50"
              setOnModal={() => setMapOnModal(false)}
              company={enroll_company}
              setCompany={setEnroll_company}
            />
          )}
          <div>시작날짜는 최소 2주 뒤부터 설정 가능합니다.</div>
          <div className="grid gap-6 mb-6 lg:grid-cols-2">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                      showTimeSelect
                      dateFormat="yy년 MM월 dd일 aa h시 mm분"
                      selected={
                        field.value ? dayjs(field.value).toDate() : null
                      }
                      onChange={(date) => field.onChange(dayjs(date).toDate())}
                      minDate={watch("startEvent")}
                      maxDate={
                        watch("startEvent")
                          ? dayjs(watch("startEvent")).add(3, "weeks").toDate()
                          : null
                      }
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
                      showTimeSelect
                      dateFormat="yy년 MM월 dd일 aa h시 mm분"
                      selected={dayjs(field.value).toDate()}
                      onChange={(date) => field.onChange(dayjs(date).toDate())}
                      minDate={watch("startEvent")}
                      maxDate={
                        watch("startEvent")
                          ? dayjs(watch("startEvent")).add(3, "weeks").toDate()
                          : null
                      }
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                이벤트명
              </label>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
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
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                이벤트태그
              </label>
              <input
                id="tag"
                placeholder=",로 태그 구분"
                {...register("tag", {
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
              />
              {watch().tag}
            </div>
            <div>
              {/* 배우명 입력 */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                배우명
              </label>
              <input
                id="castings"
                placeholder="입력해주세요"
                {...register("castings", {
                  required: "배우명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
              />
            </div>
            <div>
              {/* 주최자명 입력 */}
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                주최자명
              </label>
              <input
                id="hosts"
                placeholder="입력해주세요"
                {...register("hosts", {
                  required: "주최자명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              주소
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 "
              type="text"
              id="place"
              placeholder="입력해주세요"
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
            <div className="mb-10 flex flex-row">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setMapOnModal(true);
                }}
              >
                검색
              </Button>
            </div>
          </div>
          <div className="flex gap-8">
            <label>성인여부</label>
            <Controller
              control={control}
              name="isAdult"
              render={({ field }) => (
                <>
                  {["성인", "미성년"].map((option) => (
                    <Radio
                      key={option}
                      name={field.name}
                      id={option}
                      value={option}
                      label={option}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === option}
                    />
                  ))}
                </>
              )}
            />
          </div>
          <nav className="flex gap-8">
            <span>카테고리</span>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <>
                  {["뮤지컬", "콘서트", "연극", "클래식/무용"].map((option) => (
                    <Radio
                      key={option}
                      name={field.name}
                      id={option}
                      value={option}
                      label={option}
                      onChange={(e) => field.onChange(e.target.value)}
                      checked={field.value === option}
                    />
                  ))}
                </>
              )}
            />
          </nav>
          <Images />
          <Button className="mt-20 bg-blue-700 hover:bg-blue-800" type="submit">
            이벤트 생성
          </Button>
        </form>
      </div>
    </>
  );
};

export default Event;

//추가해야됨
// 타입
//   availablePurchaseTime: string;
//   normalPrice: number;
//   premiumPrice: number;
//   saleDegree: number;
// frm.append("availablePurchaseTime", data.name);
// frm.append("normalPrice", data.name);
// frm.append("premiumPrice", data.name);
// frm.append("saleDegree", data.name);

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
