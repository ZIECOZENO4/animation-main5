
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  videoUploader: f({ video: { maxFileSize: "1024GB" } })               
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete for", file.name);
      console.log("File URL", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;