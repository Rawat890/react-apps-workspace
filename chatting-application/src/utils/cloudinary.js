const CLOUD_NAME = '';
export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "chat-images");
  data.append("cloud_name", CLOUD_NAME);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    return result.secure_url;
  } catch (err) {
    console.error(err);
    throw err;
  }
};