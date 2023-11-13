"use client";

import { useCallback, useEffect, useState } from "react";
import { postEventImageApi } from "@/api/events";
import { getCookie } from "@/util/authCookie";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
import { useRecoilState } from "recoil";
import { imageUrlsState, thumbnailUrlState } from "@/recoil/event";

export const Images = () => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);
  const [thumbnailUrl, setThumbnailUrl] = useRecoilState(thumbnailUrlState);
  const [imageUrls, setImageUrls] = useRecoilState(imageUrlsState);

  const [atk, setAtk] = useState("");

  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
  }, []);

  const onDropThumbnail = useCallback((acceptedFiles: File[]) => {
    setThumbnail(acceptedFiles[0]);
  }, []);

  const onDropImages = useCallback((acceptedFiles: File[]) => {
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: "image/*",
    maxFiles: 1,
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
  } = useDropzone({
    onDrop: onDropImages,
    accept: "image/*",
  });
  const uploadFiles = async (e: any) => {
    e.stopPropagation();
    try {
      if (!thumbnail || images.length === 0) {
        alert("썸네일과 이미지 파일을 모두 추가해주세요.");
        return;
      }
      setUploading(true);
      const response = await postEventImageApi(atk, thumbnail, images);
      setThumbnailUrl(response.data.thumbNailImageUrl);
      setImageUrls(response.data.imageUrls);
      setUploading(false);
    } catch (error) {
      console.error("이미지 업로드 중 에러 발생:", error);
    }
  };

  //   const fileUrl = URL.createObjectURL(acceptedFiles[0]);
  //   URL.createObjectURL 메서드는 이미지 임시보관 미리보기용도

  return (
    <div>
      <div {...getThumbnailRootProps()} className="dropzone">
        <input {...getThumbnailInputProps()} />
        <p>썸네일 이미지를 드래그하거나 클릭하여 선택하세요.</p>
      </div>
      <div {...getImagesRootProps()} className="dropzone">
        <input {...getImagesInputProps()} />
        <p>업로드할 이미지 파일들을 드래그하거나 클릭하여 선택하세요.</p>
      </div>
      <Button type="button" onClick={uploadFiles} disabled={uploading}>
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </Button>
      {thumbnailUrl}
      {thumbnail && <p>선택된 썸네일: {thumbnail.name}</p>}
      <ul>
        {images.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};
