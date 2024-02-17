// Change cloud name, API Key, and API Secret below
import config from '@/config';
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: config.cloudinary.cloud_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

// Change 'sample' to any public ID of your choice

export const deleteImage = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(result);


        return result.result;
    } catch (error) {
        console.error(error);
    }
}