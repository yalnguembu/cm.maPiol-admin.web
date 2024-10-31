import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Icon from "@/ui/components/ui/Icon";

// image import
import uploadSvgImage from "@/ui/assets/images/svg/upload.svg";
import Button from "@/ui/components/ui/Button";

const DropZone = ({ value, onChange }) => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": [],
    },
    multiple: true,
    onDrop: (acceptedFiles) => {
      if (files.length) {
        setFiles([
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ),
          ...files,
        ]);
      } else
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      onChange(acceptedFiles);
    },
  });

  useEffect(() => {
    setFiles(
      value.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const removeFile = (index) => {
    setFiles(files.splice(index, 1));
  };

  return (
    <div>
      <div className="w-full text-center border-dashed border border-secondary-500 rounded-md py-4 flex flex-col justify-center items-center">
        <div
          className={"grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4"}
        >
          <div
            className={`p-4 rounded" ${
              files.length === 0 ? " col-span-3" : "border"
            }`}
          >
            <div {...getRootProps({ className: "dropzone" })}>
              <input className="hidden" {...getInputProps()} />
              <img
                src={uploadSvgImage}
                alt=""
                className="mx-auto mb-4 w-2/3 object-cover"
              />
              {isDragAccept ? (
                <p className="text-sm text-slate-500 dark:text-slate-300">
                  Drop the files here ...
                </p>
              ) : (
                <p className="text-sm text-slate-500 dark:text-slate-300 f">
                  Drop files here or click to upload.
                </p>
              )}
            </div>
          </div>
          {files.map((file, i) => (
            <div key={file.preview} className="flex-none">
              <div className="h-full w-full overflow-hidden rounded-md relative">
                <img
                  src={file.preview}
                  className="object-cover h-[200px] w-full block rounded-md "
                  // onLoad={() => {
                  //   URL.revokeObjectURL(file.preview);
                  // }}
                />
                <Button
                  icon="heroicons-outline:trash"
                  className="btn-danger light p-2 rounded-[999px] absolute top-2 right-2"
                  onClick={() => removeFile(i)}
                ></Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropZone;
