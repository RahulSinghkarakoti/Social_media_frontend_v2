import axiosInstance from "./axiosInstence";

const uploadImages = async (formdata) => {
  const res = await axiosInstance.post("images/upload", formdata,{
    headers: {
        "Content-Type": "multipart/form-data",
      }
  });
  return res.data;
};

export { uploadImages };
