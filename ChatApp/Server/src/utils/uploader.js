import cloudinary from "../config/cloudinary.conf.js";
import fs from "fs";

export const uploadFile = async (localFile) => {
  try {
    const res = await cloudinary.uploader.upload(localFile, {
      resource_type: "auto",
    });
    
    fs.unlinkSync(localFile);
    return res;

  } catch (error) {
    fs.unlinkSync(localFile);
    console.log(error)
    return null;
  }
};
