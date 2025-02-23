import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    // local file path found , now upload on cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // file uploaded
    // console.log("File uploaded on Cloudinary: " , "URL:" , uploadResult.url ,"Raw Data: ", uploadResult );

    fs.unlinkSync(localFilePath);
    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file
    return null;
  }
};

const deleteInCloudinary = async (fileUrl) => {
  try {
    if (!fileUrl) {
      return null;
    }
    const publicId = extractPublicId(fileUrl);
    if (!publicId) {
      return null;
    }

    let resourceType = "image"; // Default to image
    if (fileUrl.match(/\.(mp4|mkv|mov|avi)$/)) {
      resourceType = "video";
    } else if (fileUrl.match(/\.(mp3|wav)$/)) {
      resourceType = "raw"; // For audio or other file types
    }

    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, deleteInCloudinary };

/*
    (async function() {
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();
*/
