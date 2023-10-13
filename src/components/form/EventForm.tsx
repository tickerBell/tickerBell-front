"use client";

import React, { useCallback, useState } from "react";
import Button from "../button/Button";
import { Controller, useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import dayjs from "dayjs";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";
import { Radio } from "./Input";

type FormProps = {
  registType?: "event" | "regist";
};

const EventForm = ({ registType = "regist" }: FormProps) => {
  const today = dayjs();
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();
  const useform = useForm();
  console.log(useform);

  const [mapOnModal, setMapOnModal] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setPreviewVisible(true);
    console.log(url);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const removePreview = () => {
    setPreviewVisible(false);
    setPreviewUrl("");
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");

  const onIdChange = (e: any) => {
    setIdError("");
    setId(e.target.value);
  };

  const onHandleSubmit = (e: any) => {
    e.preventDefault();
    if (id.length < 10) {
      setIdError("too short");
    } else {
      console.log(id);
    }
    console.log(id);
  };

  console.log(watch("casting"));
  const onValid = (data: any) => console.log(data, "onvalid");
  const onInvalid = (data: any) => console.log(data, "onInvalid");
  console.log(errors);
  const form = useForm({
    defaultValues: {
      hello: "world",
    },
    mode: "onChange",
  });

  return (
    <>
      <div>
        {mapOnModal && (
          <SearchMapModal
            className="w-900 px-30 py-50"
            setOnModal={() => setMapOnModal(false)}
            company={enroll_company}
            setCompany={setEnroll_company}
          />
        )}
      </div>
      <div>
        {/* 시작시간 */}
        <div className="mt-40 w-full">
          <span>시작일 :</span>
          <Controller
            control={control}
            name="startDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value ? dayjs(field.value).toDate() : null}
                onChange={(date) => field.onChange(dayjs(date).toDate())}
              />
            )}
          />
          <span>종료일 :</span>
          <Controller
            control={control}
            name="endDate"
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={dayjs(field.value).toDate()}
                onChange={(date) => field.onChange(dayjs(date).toDate())}
              />
            )}
          />

          {/* 썸네일 파일첨부 */}
          <div
            {...getRootProps()}
            className="w-full block border-black border rounded p-3 h-200"
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>파일을 여기에 놓으세요...</p>
            ) : (
              <>
                {previewVisible ? (
                  <>
                    <button
                      onClick={removePreview}
                      className="absolute right-0 top-0 bg-red-500 text-black p-1"
                    >
                      Remove
                    </button>
                    <img
                      src={previewUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </>
                ) : (
                  <p>파일을 이곳에 드래그 앤 드롭하거나 클릭하여 선택하세요.</p>
                )}
              </>
            )}
          </div>
          {/* 장소 */}
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>주소</label>
              <input
                type="text"
                id="address"
                placeholder="입력해주세요"
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
          </div>
          {/* 제목명 */}
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>제목</label>
              <textarea
                id="name"
                placeholder="입력해주세요"
                maxLength={5}
                {...register("name", {
                  required: "제목은 필수 입력입니다.",
                  minLength: {
                    value: 2,
                    message: "2자리 이상 입력해주세요.",
                  },
                })}
                className="border border-gray-600 focus:border-green-500"
              />
            </div>
            <Button>입력</Button>
          </div>
          {/* 캐스팅 */}

          <nav className="flex gap-8">
            <span>캐스팅 :</span>
            {/* Radio 컴포넌트를 Controller로 감싸서 사용합니다. */}
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
          <form onSubmit={handleSubmit(onValid, onInvalid)}>
            <div className="mb-10 flex flex-row">
              <div className="flex items-center gap-6 whitespace-pre">
                <label>배우명</label>
                <textarea
                  id="casting"
                  placeholder="입력해주세요"
                  maxLength={4}
                  {...register("casting", {
                    required: "배우명은 필수 입력입니다.",
                    minLength: {
                      value: 2,
                      message: "2자리 이상 입력해주세요.",
                    },
                  })}
                  className="border border-gray-600 focus:border-green-500"
                />
                <button type="submit">그냥입력</button>
                <Button type="submit">입력</Button>
              </div>
            </div>
          </form>
          <form onSubmit={onHandleSubmit}>
            <h1>Login</h1>
            <input
              onChange={onIdChange}
              value={id}
              type="text"
              placeholder="ID입니다 입력해"
            />
            {idError}
            <input
              className="btn"
              type="submit"
              value="Login"
              disabled={id === "" && id.length < 10}
            />
          </form>
          <Button className="absolute bottom-0" onClick={() => {}}>
            {registType === "event" ? "이벤트 생성" : "회원 가입"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventForm;
