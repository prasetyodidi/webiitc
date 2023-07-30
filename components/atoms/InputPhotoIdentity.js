import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const InputPhotoIdentity = ({ photo, setPhoto, initialPhotoUrl }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      if (
        acceptedFiles[0] instanceof File &&
        acceptedFiles[0].type.startsWith("image/")
      ) {
        setPhoto(
          Object.assign(acceptedFiles[0], {
            preview: URL.createObjectURL(acceptedFiles[0]),
          })
        );
      } else {
        console.warn("Invalid file type. Please upload an image file.");
      }
    },
  });

  useEffect(() => {
    if (photo) {
      URL.revokeObjectURL(photo.preview);
    }
  }, [photo]);

  // If photo is not set but initialPhotoUrl is available, set the initialPhotoUrl as photo
  useEffect(() => {
    if (!photo && initialPhotoUrl) {
      setPhoto({ preview: initialPhotoUrl });
    }
  }, [initialPhotoUrl, photo, setPhoto]);

  return (
    <div
      {...getRootProps()}
      className="px-3 py-2 border rounded-lg w-full flex flex-col  items-center gap-2 cursor-pointer hover:bg-gray-100"
    >
      <input {...getInputProps()} />
      <p className="text-start">
        {isDragActive ? <span>Letakan disini</span> : <span>Pilih File</span>}
      </p>
      {photo && (
        <img
          src={photo.preview ? photo.preview : initialPhotoUrl}
          className="h-24 w-auto"
          alt="New Preview"
        />
      )}
    </div>
  );
};

export default InputPhotoIdentity;