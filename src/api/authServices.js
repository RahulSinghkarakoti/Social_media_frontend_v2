import axiosInstance from "./axiosInstence";

const login = async (data) => {
    console.log("login"); 
      const response = await axiosInstance.post("/auth/login", data);
      return response.data; 
  };

  const signup = async (formData) => {
    console.log("signup"); 
      const response = await axiosInstance.post("/auth/signup", formData);
      return response.data; 
  };
  
  const getCurrentUser = async () => {
    console.log("getCurentUser"); 
      const response = await axiosInstance.get("/auth/me");
      return response.data; 
  };
export { getCurrentUser, login, signup };
