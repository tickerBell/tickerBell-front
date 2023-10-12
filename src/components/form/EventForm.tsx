"use client";

import React, { useCallback, useState } from "react";
import Button from "../button/Button";
import { useForm } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import dayjs from "dayjs";
import SearchMapModal from "../portalModal/mapModal/SearchMapModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDropzone } from "react-dropzone";

type FormProps = {
  registType?: "event" | "regist";
};

const EventForm = ({ registType = "regist" }: FormProps) => {
  const today = dayjs();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const [mapOnModal, setMapOnModal] = useState(false);
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  console.log(startDate);
  console.log(endDate);

  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
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
        <div className="mt-40 w-full">
          <DatePicker selected={startDate} onChange={handleStartDateChange} />{" "}
          {/* 시작 날짜 선택 */}
          <DatePicker selected={endDate} onChange={handleEndDateChange} />{" "}
          {/* 종료 날짜 선택 */}
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
                    {/* Style the preview image */}
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
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>주소</label>
              <input
                type="text"
                id="roadAddress"
                placeholder="입력해주세요"
                maxLength={5}
                {...register("address.roadAddress", {
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
          <div className="mb-10 flex flex-row">
            <div className="flex items-center gap-6 whitespace-pre">
              <label>제목</label>
              <textarea
                id="title"
                placeholder="입력해주세요"
                maxLength={5}
                {...register("title", {
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
          <Button className="absolute bottom-0" onClick={() => {}}>
            {registType === "event" ? "이벤트 생성" : "회원 가입"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EventForm;
