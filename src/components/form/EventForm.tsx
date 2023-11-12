"use client";

import { postEventApi } from "@/api/events";
import classNames from "classnames";
import dayjs from "dayjs";
import { useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import Button from "../button/Button";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import { Radio } from "./Input";
import { weekDay } from "@/util/day";

type FormProps = {
  registType?: "event" | "regist";
};

const EventForm = ({ registType = "regist" }: FormProps) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<EventFormType>({ mode: "onChange" });

  const [mapOnModal, setMapOnModal] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewVisible(true);
    setFileUrl(url);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removePreview = () => {
    setPreviewVisible(false);
    setPreviewUrl("");
  };

  const onSubmit = async (data: any) => {
    console.log("dd", data);
    // if (!data.startDate) {
    //   alert("시작일은 필수 입력입니다.");
    //   return;
    // }

    // if (!data.endDate) {
    //   alert("종료일은 필수 입력입니다.");
    //   return;
    // }

    // if (!fileUrl) {
    //   alert("첨부파일은 필수 입력입니다.");
    //   return;
    // }

    // data.castings = castingsValues;
    // data.hosts = hostsValues;
    // data.fileUrl = fileUrl;
    // setCastingsValues([]);
    // setHostsValues([]);

    // postEventApi(data);
    const frm = new FormData();
    frm.append("name", data.name);
    frm.append("startEvent", data.name);
    frm.append("endEvent", data.name);
    frm.append("availablePurchaseTime", data.name);
    frm.append("normalPrice", data.name);
    frm.append("premiumPrice", data.name);
    frm.append("saleDegree", data.name);
    frm.append("castings", data.name);
    frm.append("hosts", data.name);
    frm.append("place", data.name);

    // try {
    //   const response = await postEventApi(frm);
    //   console.log(response); // 응답 확인
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // const onInvalid = (data: any) => console.log(data, "onInvalid");

  // const addToList = () => {
  //   const castingValue = watch("castings");
  //   const hostValue = watch("hosts");
  //   const startDateValue = watch("startDate");
  //   const endDateValue = watch("endDate");
  //   const categoryValue = watch("category");
  //   const ageValue = watch("age");

  //   if (castingValue) {
  //     setCastingsValues((prevValues) => [...prevValues, castingValue]);
  //   }

  //   if (hostValue) {
  //     setHostsValues((prevValues) => [...prevValues, hostValue]);
  //   }

  //   reset({
  //     castings: "",
  //     hosts: "",
  //     startDate: startDateValue,
  //     endDate: endDateValue,
  //     category: categoryValue,
  //     age: ageValue,
  //   });
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {mapOnModal && (
          <SearchMapModal
            className="w-900 px-30 py-50"
            setOnModal={() => setMapOnModal(false)}
            company={enroll_company}
            setCompany={setEnroll_company}
          />
        )}
        <div className="mt-40 w-full">
          <div>시작날짜는 최소 2주뒤부터 설정 가능합니다.</div>
          <div className="mb-10 flex flex-row">
            <div>
              <label>시작일</label>
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    showTimeSelect
                    dateFormat="yy년 MM월 dd일 aa h시 mm분"
                    selected={field.value ? dayjs(field.value).toDate() : null}
                    onChange={(date) => field.onChange(dayjs(date).toDate())}
                    minDate={weekDay(2).toDate()}
                  />
                )}
              />
            </div>
            <div>
              <span>종료일</span>
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    showTimeSelect
                    dateFormat="yy년 MM월 dd일 aa h시 mm분"
                    selected={dayjs(field.value).toDate()}
                    onChange={(date) => field.onChange(dayjs(date).toDate())}
                    minDate={watch("startDate")}
                    maxDate={
                      watch("startDate")
                        ? dayjs(watch("startDate")).add(3, "weeks").toDate()
                        : null
                    }
                  />
                )}
              />
            </div>
          </div>

          {/* 썸네일 파일첨부 */}
          <div className="flex">
            <label htmlFor="">썸네일 이미지</label>
            <div
              {...getRootProps()}
              className={classNames("w-full  p-3 cursor-pointer", {
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
                          className="w-full h-full object-conatin"
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
            </div>
          </div>

          {/* 장소 */}
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>주소</label>
              <input
                type="text"
                id="address"
                placeholder="입력해주세요"
                onClick={() => setMapOnModal(true)}
                maxLength={5}
                {...register("address", {
                  required: "주소는 필수 입력입니다.",
                  minLength: {
                    value: 5,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                value={enroll_company.address}
              />
            </div>
            <Button onClick={() => setMapOnModal(true)}>검색</Button>
            {errors.address && (
              <small role="alert">{errors.address.message}</small>
            )}
          </div>

          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>이벤트명</label>
              <input
                type="text"
                id="name"
                placeholder="입력해주세요"
                maxLength={5}
                {...register("eventName", {
                  required: "이벤트명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="border border-gray-600 focus:border-green-500"
              />
            </div>
            {errors.eventName && (
              <small role="alert">{errors.eventName.message}</small>
            )}
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
                      onChange={(e: any) => field.onChange(e.target.value)}
                      checked={field.value === option}
                    />
                  ))}
                </>
              )}
            />
          </nav>
          <div className="flex gap-8">
            <label>성인여부</label>
            <Controller
              control={control}
              name="adultchk"
              render={({ field }) => (
                <>
                  {["성인", "미성년"].map((option) => (
                    <Radio
                      key={option}
                      name={field.name}
                      id={option}
                      value={option}
                      label={option}
                      onChange={(e: any) => field.onChange(e.target.value)}
                      checked={field.value === option}
                    />
                  ))}
                </>
              )}
            />
          </div>

          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>배우명</label>
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
                className="border border-gray-600 focus:border-green-500"
              />
            </div>
            {errors.castings && (
              <small role="alert">{errors.castings.message}</small>
            )}
          </div>
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>주최자명</label>
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
                className="border border-gray-600 focus:border-green-500"
              />
            </div>
            {errors.hosts && <small role="alert">{errors.hosts.message}</small>}
          </div>
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>태그</label>
              <input
                id="tag"
                placeholder=",로 태그 구분"
                {...register("tag", {
                  // required: "주최자명은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="border border-gray-600 focus:border-green-500"
              />
            </div>
            {watch().tag}
          </div>

          <Button className="mt-20" type="submit">
            {" "}
            이벤트 생성{" "}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EventForm;
