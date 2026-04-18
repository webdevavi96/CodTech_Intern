import { v2 as cloudinary } from "cloudinary";
import { cloud_secret, cloud_key, cloudinary_collection } from "../../constant.js";

cloudinary.config({
  cloud_name: cloudinary_collection,
  api_key: cloud_key,
  api_secret: cloud_secret,
});

export default cloudinary;
