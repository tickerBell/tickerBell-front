"use client";

import { postEventApi } from "@/api/events";
import { imageUrlsState, thumbnailUrlState } from "@/recoil/event";
import { getCookie } from "@/util/authCookie";
import dayjs from "dayjs";
import weekDay from "dayjs/plugin/weekday";
import { useEffect, useState } from "react";
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
  const thumbnailUrl = useRecoilValue(thumbnailUrlState);
  const imageUrls = useRecoilValue(imageUrlsState);
  const [mapOnModal, setMapOnModal] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });
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

  const addTag = (tagName) => {
    if (tagName && tagName.length >= 2) {
      // 태그 이름의 유효성 검사
      appendTag({ name: tagName });
    }
  };
  const addCasting = (castingName) => {
    if (castingName && castingName.length >= 2) {
      appendCasting({ name: castingName });
    }
  };

  const addHost = (hostName) => {
    if (hostName && hostName.length >= 2) {
      appendHost({ name: hostName });
    }
  };

  const handleKeyDown = (event, action) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const name = event.currentTarget.value.trim();
      if (name) {
        action(name);
        event.currentTarget.value = "";
      }
    }
  };

  const onSubmit = async (onData: FormData) => {
    const data = JSON.parse(JSON.stringify(onData));

    const tagNames = data.tags.map((tag) => tag.name);
    const castingNames = data.castings.map((casting) => casting.name);
    const hostNames = data.hosts.map((host) => host.name);
    const payload = {
      startEvent: dayjs(data.startEvent).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      endEvent: dayjs(data.endEvent).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      name: data.name,
      tags: tagNames,
      castings: castingNames,
      hosts: hostNames,
      place: data.place,
      category: data.category,
      isAdult: data.isAdult,
      normalPrice: data.normalPrice,
      premiumPrice: data.premiumPrice,
      saleDegree: data.saleDegree,
      availablePurchaseTime: dayjs(data.availablePurchaseTime).format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]"
      ),
      isSpecialA: data.isSpecialA,
      isSpecialB: data.isSpecialB,
      isSpecialC: data.isSpecialC,
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

            {/* 이벤트 태그 */}

            <div>
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                이벤트태그
              </label>
              <input
                id="tags"
                name="tags"
                placeholder="이벤트 태그를 입력하고 엔터를 누르세요"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
                onKeyDown={(e) => handleKeyDown(e, addTag)}
              />
            </div>
            <div className="mt-2">
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
                      제거
                    </button>
                  </div>
                </div>
              ))}
              <div>이벤트태그: {JSON.stringify(tagsValue)}</div>
            </div>

            {/* 이벤트 캐스팅 */}

            <div>
              <label
                htmlFor="castings"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                배우명
              </label>
              <input
                id="castings"
                name="castings"
                type="text"
                placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addCasting)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              />
              <div>
                출연자:
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
                        제거
                      </button>
                    </div>
                  </div>
                ))}
                <div>출연자: {JSON.stringify(castingValue)}</div>
              </div>
            </div>

            {/* 이벤트 호스트 */}

            <div>
              <label
                htmlFor="hosts"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                주최자명
              </label>
              <input
                id="hosts"
                name="hosts"
                placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addHost)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700"
              />
              <div>
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
                        제거
                      </button>
                    </div>
                  </div>
                ))}
                <div>주최자: {JSON.stringify(hostValue)}</div>
              </div>
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
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMapOnModal(true);
                }}
              >
                검색
              </Button>
            </div>
          </div>
          <div className="flex gap-8 ">
            <label>성인여부</label>
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
          <nav className="flex gap-8">
            <span>카테고리</span>
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <>
                  {["MUSICAL", "CONCERT", "PLAY", "CLASSIC", "SPORTS"].map(
                    (option) => (
                      <Radio
                        key={option}
                        name={field.name}
                        id={option}
                        value={option}
                        label={option}
                        onChange={(e) =>
                          field.onChange((e.target as HTMLInputElement).value)
                        }
                        checked={field.value === option}
                      />
                    )
                  )}
                </>
              )}
            />
          </nav>
          <div>
            <label htmlFor="normalPrice">일반 가격</label>
            <input {...register("normalPrice")} type="number" />
            {errors.normalPrice && <p>{errors.normalPrice.message}</p>}
          </div>
          <div>
            <label htmlFor="premiumPrice">프리미엄 가격</label>
            <input {...register("premiumPrice")} type="number" />
            {errors.premiumPrice && <p>{errors.premiumPrice.message}</p>}
          </div>
          <div>
            <label htmlFor="saleDegree">할인 금액</label>
            <input {...register("saleDegree")} type="number" />
            {errors.saleDegree && <p>{errors.saleDegree.message}</p>}
          </div>
          <div>
            <label htmlFor="availablePurchaseTime">구매 가능 시간</label>
            <Controller
              control={control}
              name="availablePurchaseTime"
              render={({ field }) => (
                <DatePicker
                  {...field}
                  showTimeSelect
                  dateFormat="yy년 MM월 dd일 aa h시 mm분"
                />
              )}
            />
            {errors.availablePurchaseTime && (
              <p>{errors.availablePurchaseTime.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="isSpecialA">특별 옵션 A</label>
            <input {...register("isSpecialA")} type="checkbox" />
          </div>
          <div>
            <label htmlFor="isSpecialB">특별 옵션 B</label>
            <input {...register("isSpecialB")} type="checkbox" />
          </div>
          <div>
            <label htmlFor="isSpecialC">특별 옵션 C</label>
            <input {...register("isSpecialC")} type="checkbox" />
          </div>
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
