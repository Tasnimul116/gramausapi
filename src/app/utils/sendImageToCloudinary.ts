import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName.trim(), resource_type:'auto' },
      (error, result) => {
        // Always delete the file
        fs.unlink(path, () => {});

        if (error) return reject(error);
        resolve(result);
      }
    );
  });
};
