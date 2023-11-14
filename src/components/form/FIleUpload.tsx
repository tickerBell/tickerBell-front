import React, { useState, useCallback } from "react";
import { IoTrash } from "react-icons/io5";

interface FileWithPreview extends File {
  preview: string;
}

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const mappedFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles((prevFiles) => [...prevFiles, ...mappedFiles]);
  }, []);

  const removeFile = (fileToRemove: FileWithPreview) => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileToRemove.name)
    );
    URL.revokeObjectURL(fileToRemove.preview); // Clean up the memory
  };

  const fileInputClicked = () => {
    document.getElementById("hidden-file-input")?.click();
  };

  const fileChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = event.target.files ? Array.from(event.target.files) : [];
    onDrop(newFiles);
  };

  return (
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 py-12">
        <p>썸네일 이미지를 드래그하거나 클릭하여 선택하세요.</p>
        <input
          id="hidden-file-input"
          type="file"
          multiple
          className="hidden"
          onChange={fileChanged}
        />
        <button
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-sm"
          onClick={fileInputClicked}
        >
          Upload a file
        </button>
      </div>

      <ul className="flex flex-wrap p-2">
        {files.map((file, index) => (
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
    </div>
  );
};

export default FileUpload;
