"use client";

import { postEventApi } from "@/api/events";
import { day, postEventDateType, weekDay } from "@/util/day";
import { useMutation } from "@tanstack/react-query";
import { KeyboardEvent, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm, SubmitHandler } from "react-hook-form";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { ImageUpload } from "./ImageUpload";
import { CheckBox, Input, Radio } from "./Input";
import { InputField } from "./InputField";
import { OnDatePicker } from "./OnDatePicker";
import dayjs from "dayjs";
import DatePicker from "react-datepicker";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Event = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      tags: [],
      castings: [],
      hosts: [],
    },
  });

  const today = new Date();
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
    onError: (error: any) => {
      console.log('error', error)
    },
    onSuccess: () => {
      toast.success('등록성공');
      router.push('/');
      // console.log('dd', payload);
      // queryClient.invalidateQueries({ queryKey: ['event-reservelist', getPaging] })
    }
  })

  const onSubmit: SubmitHandler<FormData> = async (onData: any) => {
    // const onSubmit = (onData: any) => {
    const tagNames = onData?.tags?.map((tag: any) => tag.name);
    const castingNames = onData?.castings?.map((casting: any) => casting.name);
    const hostNames = onData?.hosts?.map((host: any) => host.name);

    const payload = {
      name: onData.name,
      startEvent: `${dayjs(onData.startEvent).format('YYYY-MM-DD')}T00:00:00Z`,
      endEvent: `${dayjs(onData.endEvent).format('YYYY-MM-DD')}T23:59:59Z`,
      dailyStartEvent: `${dayjs(onData.dailyStartEsvent).format('HH:mm')}`,
      // eventTime: Number(onData.eventTime),
      eventTime: onData.eventTime,
      availablePurchaseTime: `${dayjs(onData.availablePurchaseTime).format('YYYY-MM-DDTHH:mm:ss')}Z`,
      normalPrice: Number(onData.normalPrice),
      premiumPrice: Number(onData.premiumPrice),
      saleDegree: Number(onData.saleDegree),
      castings: castingNames,
      hosts: hostNames,
      place: enroll_company.address,
      description: onData.description,
      isAdult: onData.isAdult === 'adult' ? true : false,
      isSpecialA: onData.isSpecialA === undefined ? false : true,
      isSpecialB: onData.isSpecialB === undefined ? false : true,
      isSpecialC: onData.isSpecialC === undefined ? false : true,
      category: onData.category,
      tags: tagNames,
      thumbNailUrl: thumbNailUrl,
      imageUrls: imageUrls,
    };
    // console.log('폼데이터', onData.name);
    console.log("전송데이터", onData, 'payload', payload);

    // TODO: 정보확인 창 추가
    createEventMutation.mutate(payload);
  };

  // console.log('watch', watch());

  return (
    <>
      <div className="flex flex-col justify-center w-full gap-52">
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
            <div className="flex items-center mb-20 space-x-5">
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
            <div className="flex flex-col mb-20">
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
              </div>
              {errors.name && (
                <small className="text-red-500">{errors.name.message}</small>
              )}
            </div>
            <div className="flex flex-row gap-12 mb-10">
              <div className="flex flex-col">
                <div>
                  <div
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    시작일
                  </div>
                  <Controller
                    control={control}
                    name="startEvent"
                    rules={{ required: '시작일은 필수입니다.' }}
                    render={({ field }) => (
                      <DatePicker
                        className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        dateFormat="yy년 MM월 dd일"
                        selected={field.value ? dayjs(field.value).toDate() : null}
                        onChange={(date) => field.onChange(dayjs(date).toDate())}
                        minDate={weekDay(2).toDate()}
                      />
                    )}
                  />
                </div>
                {errors.startEvent && (
                  <small role="alert">{errors.startEvent.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <div>
                  <div className="block mb-2 text-sm font-medium text-gray-900 ">
                    종료일
                  </div>
                  <Controller
                    control={control}
                    name="endEvent"
                    rules={{ required: '종료일은 필수입니다.' }}
                    render={({ field }) => (
                      <DatePicker
                        className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        dateFormat="yy년 MM월 dd일"
                        selected={field.value ? dayjs(field.value).toDate() : null}
                        onChange={(date) => field.onChange(dayjs(date).toDate())}
                        minDate={watch('startEvent') ? watch('startEvent') : weekDay(2).toDate()}
                      />
                    )}
                  />
                </div>
                {errors.endEvent && (
                  <small role="alert">{errors.endEvent.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <div>
                  <div className="block mb-2 text-sm font-medium text-gray-900">
                    시작 시간
                  </div>
                  <Controller
                    control={control}
                    name="dailyStartEvent"
                    rules={{ required: '이벤트 시작 시간은 필수입니다.' }}
                    render={({ field }) => (
                      <DatePicker
                        className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        dateFormat="HH시 mm분"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="시작 시간"
                        selected={field.value ? dayjs(field.value).toDate() : null}
                        onChange={(date) => field.onChange(dayjs(date).toDate())}
                      />
                    )}
                  />
                </div>
                {errors.dailyStartEvent && (
                  <small role="alert">{errors.dailyStartEvent.message}</small>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-12 mb-10">
              <div className="flex flex-col">
                <div>
                  <div className="block mb-2 text-sm font-medium text-gray-900">
                    구매 가능 시간
                  </div>
                  <Controller
                    control={control}
                    name="availablePurchaseTime"
                    rules={{ required: '구매 가능 시간은 필수입니다.' }}
                    render={({ field }) => (
                      <DatePicker
                        className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                        dateFormat="yy년 MM월 dd일 HH시 mm분"
                        selected={field.value ? dayjs(field.value).toDate() : null}
                        onChange={(date) => field.onChange(dayjs(date).toDate())}
                        showTimeSelect
                        timeIntervals={15}
                        minDate={weekDay(0).toDate()}
                      />
                    )}
                  />
                </div>
                {errors.availablePurchaseTime && (
                  <small role="alert">{errors.availablePurchaseTime.message}</small>
                )}
              </div>
              <div className="flex flex-col">
                <div>
                  <div className="block mb-2 text-sm font-medium text-gray-900">상영 시간</div>
                  <input type="number" id="eventTime" placeholder="단위 - 분" maxLength={1440} className="w-full p-16 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                    {...register('eventTime', { required: '상영시간은 필수 입력입니다.' })}
                  />
                </div>
                {errors.eventTime && (
                  <small role="alert">{errors.eventTime.message}</small>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-12 mb-10">
              <InputField
                id="castings"
                label="배우명"
                name="castings"
                placeholder="출연자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addCasting)}
                fields={castingsFields}
                remove={removeCasting}
                register={register}
              />
              {errors.castings && (
                <small role="alert">{errors.castings.message}</small>
              )}
            </div>
            <div className="flex flex-col gap-12 mb-10">
              <InputField
                label="주최자명"
                id="hosts"
                name="hosts"
                placeholder="주최자 이름을 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addHost)}
                fields={hostsFields}
                remove={removeHost}
                register={register}
              // {...register('hosts', { required: '주최명은 필수 입력입니다.' })}
              />

              {errors.hosts && (
                <small role="alert">{errors.hosts.message}</small>
              )}
            </div>
            <div className="flex flex-col gap-12 mb-10">
              <InputField
                id="tags"
                name="tags"
                label="태그"
                placeholder="이벤트 태그를 입력하고 엔터를 누르세요"
                onKeyDown={(e) => handleKeyDown(e, addTag)}
                fields={tagsFields}
                remove={removeTag}
                register={register}
                requiredText="입력해주세요"
              />
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
                    // maxLength={5}
                    value={enroll_company.address}
                    readOnly
                    // {...register("place", { required: '이벤트 주소는 필수 입력입니다.' })}
                    // defaultValue=""
                    onClick={(e) => {
                      e.stopPropagation();
                      setMapOnModal(true);
                    }}
                  />
                  <Button
                    type="button"
                    onClick={(e: any) => {
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
            <div className="flex flex-col mb-20">
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
            <div className="flex flex-col mb-20">
              <div className="flex flex-row">
                <div className="mr-10">성인여부</div>
                <div className="flex flex-row gap-12">
                  {["adult", "none-adult"].map((value, key) =>
                  (
                    <Radio
                      key={key}
                      label={value === 'adult' ? "성인" : "미성년"}
                      id={value}
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
                  type="text"
                  {...register("normalPrice", {
                    required: '가격은 필수 입력입니다.',
                    // onChange: (e) => {
                    //   const formattedInput = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    //   e.target.value = formattedInput;
                    // },
                  })}
                />
                {errors.normalPrice && (
                  <small role="alert">{errors.normalPrice.message}</small>
                )}
              </div>
              <Input
                {...register("premiumPrice", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                  // onChange: (e) => {
                  //   const formattedInput = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                  //   e.target.value = formattedInput;
                  // },
                })}
                label="프리미엄 가격"
                id="premiumPrice"
                type="text"
              />
              <Input
                {...register("saleDegree", {
                  pattern: {
                    value: /^[0-9]*$/,
                    message: '숫자만 입력 가능합니다.',
                  },
                })}
                label="할인 금액"
                id="saleDegree"
                type="text"
              />
            </div>

            <div className="relative my-10 h-60">
              <div className="absolute">
                {watch().premiumPrice > 0 &&
                  <>
                    <small className="text-blue-400"> 선택한 좌석이 프리미엄 가격으로 지정됩니다. </small>
                    <div className="flex flex-row gap-8 item-center">
                      <CheckBox
                        {...register("isSpecialA")}
                        label="A 좌석"
                        id="isSpecialA"
                        type="checkbox"
                      />
                      <CheckBox
                        {...register("isSpecialB")}
                        label="B 좌석"
                        id="isSpecialB"
                        type="checkbox"
                      />
                      <CheckBox
                        {...register("isSpecialC")}
                        label="C 좌석"
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
              <textarea
                className="w-full p-6 mt-20 border resize-none"
                placeholder="상세 내용 입력" id="description"
                {...register("description")}
              />
            </div>

            <Button
              className="mt-20 bg-blue-700 hover:bg-blue-800"
              type="submit"
              onClick={onSubmit}
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
