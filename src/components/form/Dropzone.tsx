import Image from "next/image";
import { useDropzone } from "react-dropzone";
import Button from "../button/Button";
interface FileWithPreview extends File {
  preview: string;
}

type DropzoneProps = {
  dropzoneProps: ReturnType<typeof useDropzone>;
  filesPreview: FileWithPreview[];
  removeFile: (fileToRemove: FileWithPreview) => void;
  uploadFiles: (e: any) => void;
  uploading: boolean;
  message: string;
};

export const Dropzone: React.FC<DropzoneProps> = ({
  dropzoneProps,
  filesPreview,
  removeFile,
  uploadFiles,
  uploading,
  message,
}) => (
  <div>
    <div
      {...dropzoneProps.getRootProps()}
      className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12 dropzone cursor-pointer"
    >
      <input {...dropzoneProps.getInputProps()} />
      <p>{message}</p>
    </div>
    <ul className="flex flex-row">
      {filesPreview.map((file, index) => (
        <li key={index} className="w-1/2 sm:w-1/3 md:w-1/4 p-1 flex flex-row ">
          <div className="relative border rounded-md p-2 group  w-92 h-92">
            <Image
              src={file.preview}
              alt={file.name}
              width={368}
              height={368}
              className="object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-between p-2 text-transparent hover:text-white group-hover:bg-black group-hover:bg-opacity-50">
              <span className="text-xs break-words">{file.name}</span>
              <span className="text-xs">
                {(file.size / 1024).toFixed(2)} KB
              </span>
              <button
                className="absolute bottom-0 right-0 p-1 rounded-md hover:bg-red-600 bg-opacity-75"
                onClick={() => removeFile(file)}
              ></button>
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
