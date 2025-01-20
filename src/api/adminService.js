import axiosInstance from "./axiosInstence"; 


const getDashboard=async()=>{
    const response = await axiosInstance.get("users/admin/dashboard");
    return response.data; 
}
const getUserInfo=async(userId)=>{
    const response = await axiosInstance.get(`users/admin/userinfo/${userId}`);
    return response.data; 
}

export {
    getDashboard,
    getUserInfo
}