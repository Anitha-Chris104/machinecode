import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadBrochure = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "MachineCode/Brochures",
        resource_type: "raw",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

export default uploadBrochure;
