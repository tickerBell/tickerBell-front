"use client";

import { postEventImageApi } from "@/api/events";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoTrash } from "react-icons/io5";
import { getCookie } from "../../util/authCookie";
import Button from "../button/Button";

type Image = {
  setThumbnailUrl: (url: string) => void;
  setImageUrls: (urls: string[]) => void;
};

interface FileWithPreview extends File {
  preview: string;
}
type Preview = {
  url: string;
  name: string;
  size: number;
};

export const Images = ({
  setThumbnailUrl,

  setImageUrls,
}: Image) => {
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<Preview | null>(
    null
  );
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<FileWithPreview[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const [atk, setAtk] = useState("");

  useEffect(() => {
    setAtk(getCookie("ticket-atk"));
  }, []);

  const onDropThumbnail = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileURL = URL.createObjectURL(acceptedFiles[0]);
    setThumbnailPreview({ url: fileURL, name: file.name, size: file.size });
    setThumbnail(file);
  }, []);

  const onDropImages = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImagesPreview((prevImages) => [...prevImages, ...mappedFiles]);
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeFile = (fileToRemove: FileWithPreview) => {
    setImagesPreview((prevFiles) =>
      prevFiles.filter((file) => file !== fileToRemove)
    );
    URL.revokeObjectURL(fileToRemove.preview);
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onDropThumbnail,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxFiles: 1,
  });

  const {
    getRootProps: getImagesRootProps,
    getInputProps: getImagesInputProps,
  } = useDropzone({
    onDrop: onDropImages,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
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

  return (
    <div>
      <div {...getThumbnailRootProps()} className="dropzone">
        <input {...getThumbnailInputProps()} />
        <p>썸네일 이미지를 드래그하거나 클릭하여 선택하세요.</p>
      </div>
      <div className="w-1/2 sm:w-1/3 md:w-1/4 p-1">
        <div className="relative border rounded-md p-2 group  w-92 h-92">
          <img
            src={thumbnailPreview?.url}
            alt="썸네일 이미지"
            className="object-cover w-72 h-72"
          />
          <span className="text-xs break-words">
            {thumbnailPreview
              ? `${thumbnailPreview.name} (${thumbnailPreview.size} bytes)`
              : "이미지가 없습니다."}
          </span>
        </div>
      </div>
      <div {...getImagesRootProps()} className="dropzone">
        <input {...getImagesInputProps()} />
        <p>업로드할 이미지 파일들을 드래그하거나 클릭하여 선택하세요.</p>
      </div>
      <ul>
        {imagesPreview.map((file, index) => (
          <li key={index} className="w-1/2 sm:w-1/3 md:w-1/4 p-1">
            <div className="relative border rounded-md p-2 group  w-92 h-92">
              <img
                src={file.preview}
                alt={file.name}
                className="object-cover w-72 h-72"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-2 text-transparent hover:text-white group-hover:bg-black group-hover:bg-opacity-50">
                <span className="text-xs break-words">{file.name}</span>
                <span className="text-xs">
                  {(file.size / 1024).toFixed(2)} KB
                </span>
                <button
                  className="absolute top-0 right-0 p-1 rounded-md hover:bg-red-600 bg-opacity-75"
                  onClick={() => removeFile(file)}
                >
                  <IoTrash />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={uploadFiles} disabled={uploading}>
        {uploading ? "업로드 중..." : "이미지 업로드"}
      </Button>
    </div>
  );
};
