// components/VideoUploader.tsx
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";

export function VideoUploader({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter, "videoUploader">
      endpoint="videoUploader"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}