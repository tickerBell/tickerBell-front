"use client";

import { postEventApi } from "@/api/events";
import { day, weekDay } from "@/util/day";
import { useMutation } from "@tanstack/react-query";
import { KeyboardEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFieldArray, useForm } from "react-hook-form";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { ImageUpload } from "./ImageUpload";
import { CheckBox, Input, Radio } from "./Input";
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

  const [mapOnModal, setMapOnModal] = useState(false);
  const [thumbNailUrl, setThumbNailUrl] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
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

  const createEventMutation = useMutation({
    mutationFn: (payload: any) => postEventApi(payload),
    onSuccess: (payload: any) => {
      console.log('dd', payload);
      // queryClient.invalidateQueries({ queryKey: ['event-reservelist', getPaging] })
    }
  })

  const onSubmit = async (onData: FormData): Promise<void> => {
    const tagNames = onData.tags.map((tag) => tag.name);
    const castingNames = onData.castings.map((casting) => casting.name);
    const hostNames = onData.hosts.map((host) => host.name);
    const updatedImageUrls = [thumbNailUrl, ...imageUrls];

    const payload = {
      name: onData.name,
      startEvent: `${day(onData.startEvent)}Z`,
      endEvent: `${day(onData.endEvent)}Z`,
      dailyStartEvent: "20:30:00",
      eventTime: 90,
      availablePurchaseTime: day(onData.availablePurchaseTime),
      normalPrice: onData.normalPrice,
      premiumPrice: onData.premiumPrice,
      saleDegree: onData.saleDegree,
      castings: castingNames,
      hosts: hostNames,
      place: onData.place,
      isAdult: onData.isAdult,
      isSpecialA: onData.isSpecialA,
      isSpecialB: onData.isSpecialB,
      isSpecialC: onData.isSpecialC,
      category: onData.category,
      tags: tagNames,
      imageUrls: updatedImageUrls,
      // description: onData.description
    };
    console.log("dd", payload);

    createEventMutation.mutate(payload);
  };

  console.log('watch', watch());

  // 컴포넌트 반환
  return (
    <>
      <div className="flex flex-col justify-center w-full mt-12 gap-52">
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
              <div className="flex items-center justify-center flex-shrink-0 w-32 h-32 font-mono text-2xl text-yellow-500 bg-yellow-200 rounded-full">
                i
              </div>
              <div className="self-start block pl-2 text-xl font-semibold text-gray-700">
                <h2 className="leading-relaxed">Create an Event</h2>
                <p className="text-sm font-normal leading-relaxed text-gray-500">
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
                className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                type="text"
                id="name"
                placeholder="입력해주세요"
                maxLength={20}
                {...register("name", {
                  required: "이벤트명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
              />
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="flex flex-row gap-12 mb-10">
              {/* 시작일 선택 */}
              <div>
                <div
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  시작일
                </div>
                <OnDatePicker
                  control={control}
                  name="startEvent"
                  minDate={weekDay(2).toDate()}
                  rules={{ required: '시작일은 필수입니다.' }}
                />
                {errors.startEvent && (
                  <small role="alert">{errors.startEvent.message}</small>
                )}
              </div>
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900 ">
                  종료일
                </div>
                <OnDatePicker
                  control={control}
                  name="endEvent"
                  minDate={weekDay(2).toDate()}
                  rules={{ required: true }}
                />
              </div>
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900">
                  구매 가능 시간
                </div>
                <OnDatePicker
                  control={control}
                  name="availablePurchaseTime"
                />
              </div>
              <div>
                <div className="block mb-2 text-sm font-medium text-gray-900">상영 시간</div>
                <input type="number" name="" id="" placeholder="단위 - 분" maxLength={1440} className="w-full p-16 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 " />
              </div>
            </div>
            {/* 이벤트 캐스팅 */}
            <div>
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
              </div>
              <div>
                <InputField
                  id="castings"
                  label="배우명"
                  // name="castings"
                  placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                  onKeyDown={(e) => handleKeyDown(e, addCasting)}
                  fields={castingsFields}
                  remove={removeCasting}
                  {...register("castings", { required: '캐스팅은 필수 입력입니다.' })}
                />
                {errors.castings && (
                  <small role="alert">{errors.castings.message}</small>
                )}
              </div>
              <div>
                <InputField
                  id="hosts"
                  label="주최자명"
                  placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                  onKeyDown={(e) => handleKeyDown(e, addHost)}
                  fields={hostsFields}
                  remove={removeHost}
                  {...register('hosts', { required: '주최명은 필수 입력입니다.' })}
                />
                {errors.hosts && (
                  <small role="alert">{errors.hosts.message}</small>
                )}
              </div>
            </div>
            <div className="mb-10">
              <div>
                <label htmlFor="place" className="block mb-2 text-sm font-medium text-gray-900 "
                > 주소 </label>
                <div className="flex flex-row gap-12">
                  <input
                    className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 "
                    type="text"
                    id="place"
                    maxLength={5}
                    value={enroll_company.address}
                    readOnly
                    {...register("place", { required: '이벤트 주소는 필수 입력입니다.' })}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapOnModal(true);
                    }}
                  />
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
              {errors.place && (
                <small role="alert">{errors.place.message}</small>
              )}
            </div>
            {/* <div className="flex flex-row ">
              <label>성인여부</label>
              <div className="flex flex-row gap-12">
                <label>
                  <FRRadio {...register("isAdult")} value="true" id="adult" />
                  성인
                </label>
                <label>
                  <FRRadio
                    {...register("isAdult")}
                    value="false"
                    id="non-adult"
                  />
                  미성년
                </label>
              </div>
            </div> */}
            <div className="flex flex-col mb-10">
              <div className="flex flex-row">
                <div className="mr-10">카테고리</div>
                <div className="flex flex-row gap-12">
                  {["MUSICAL", "CONCERT", "PLAY", "CLASSIC", "SPORTS"].map(
                    (category, key) => {
                      const selectedCategory = watch("category");
                      const borderClass =
                        selectedCategory === category
                          ? "border-blue-500"
                          : "border-gray-200";

                      return (
                        <>
                          <Radio
                            key={key}
                            label={category}
                            id={category}
                            type="radio"
                            value={category}
                            className={borderClass}
                            {...register("category", { required: "카테고리를 선택해주세요" })}
                          />
                        </>
                      );
                    }
                  )}
                </div>
              </div>
              <div>
                {errors.category && (
                  <small role="alert">{errors.category.message}</small>
                )}
              </div>
            </div>
            <div className="flex flex-col mb-10">
              <div className="flex flex-row">
                <div className="mr-10">성인여부</div>
                <div className="flex flex-row gap-12">
                  {["adult", "none-adult"].map((value, key) =>
                  (
                    <Radio
                      key={key}
                      label={value === 'adult' ? "성인" : "미성년"}
                      id={"isAdult"}
                      value={value}
                      {...register("isAdult", { required: "성인여부를 체크해주세요" })}
                    />
                  )
                  )}
                </div>
              </div>
              {errors.isAdult && (
                <small role="alert">{errors.isAdult.message}</small>
              )}
            </div>
            <div className="flex flex-row gap-12 ">
              <div>
                <Input
                  className=""
                  label="일반 가격"
                  id="normalPrice"
                  type="number"
                  {...register("normalPrice", { required: '가격은 필수입력입니다.' })}
                />
                {errors.normalPrice && (
                  <small role="alert">{errors.normalPrice.message}</small>
                )}
              </div>
              <Input
                {...register("premiumPrice")}
                label="프리미엄 가격"
                id="premiumPrice"
                type="number"
              />
              <Input
                {...register("saleDegree")}
                label="할인 금액"
                id="saleDegree"
                type="number"
              />
            </div>

            <div className="relative h-60 my-10">
              <div className="absolute">
                {watch().premiumPrice > 0 &&
                  <>
                    <small> 선택한 좌석이 프리미엄 가격으로 지정됩니다. </small>
                    <div className="flex flex-row item-center">
                      <CheckBox
                        {...register("isSpecialA")}
                        label="특별 옵션 A"
                        id="isSpecialA"
                        type="checkbox"
                      />
                      <CheckBox
                        {...register("isSpecialB")}
                        label="특별 옵션 B"
                        id="isSpecialB"
                        type="checkbox"
                      />
                      <CheckBox
                        {...register("isSpecialC")}
                        label="특별 옵션 C"
                        id="isSpecialC"
                        type="checkbox"
                      />
                    </div>
                  </>
                }
              </div>
            </div>

            <ImageUpload
              setThumbNailUrl={setThumbNailUrl}
              setImageUrls={setImageUrls}
            />

            <div>
                <textarea placeholder="상세 내용 입력" />
            </div>

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
