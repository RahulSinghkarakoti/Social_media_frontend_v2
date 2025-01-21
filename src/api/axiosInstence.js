import axios from "axios";
const BASE_URL="https://social-media-backend-v2-nizf.onrender.com/api/v1"
// const BASE_URL="http://localhost:3000/api/v1"

const axiosInstance = axios.create({

baseURL: BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});


axiosInstance.interceptors.request.use( // add access token for each request 
    (config) => {
        const token = localStorage.getItem("accessToken") || "";
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
  (error) => {
    return Promise.reject(error);
  }
);

async function getNewRefreshToken() {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(
      `${BASE_URL}/auth/refresh-token`,
      {
        refreshToken,
      } 
    ); 
    localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    return response.data.data.accessToken;
  } catch (error) {
    console.error(error.response.data.message);

    console.log("unable to refresh token", error);
    throw error;
  }
}

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

 async  (error) => {
   console.log( error.response.data.message);
  console.log("in error ")

    const originalRequest = error.config;
    console.log(error)
    if (error.response.status === 401 &&  error.response.data.message==="jwt expired") {
      originalRequest._retry = true;
      try {
         
        const newToken = await getNewRefreshToken();
        

        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (tokenRefreshError) {
        return Promise.reject(tokenRefreshError);
      }
    }

    return Promise.reject(error);
  }
);


export default axiosInstance