import   { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { getUserInfo } from "../api/adminService";

const User = () => {
  const [loading,setLoading]=useState(true)
  const [userInfo, setUserInfo] = useState({}); 
  const { userId } = useParams();
  console.log(userId) 
  const fetchUserInfo=async()=>{
   try {
     const res=await getUserInfo(userId)
     console.log(res.data.userInfo[0])
     setUserInfo(res.data.userInfo[0])
   } catch (error) {
    console.error(error)
   }finally{
    setLoading(false)
   }
  }

  useEffect(()=>{
    fetchUserInfo()
  },[])

     
  return (
    <div className="  flex justify-center  items-center p-3 bg-pink-400">
     { loading?
     <div> Loading...</div>
     :
        <div className="flex flex-col justify-between   gap-3 text-lg w-3/4 bg-red-100  text-zinc-600">
          <div className="rounded-xl p-2  ">
             
            <p className="text-black ">
              ID: <span className="font-semibold">{userId}</span>
            </p>
             
            <p className="text-black">
              Name:{" "}
              <span className=" font-semibold">
                {userInfo.username || "N/A"}
              </span>
            </p>
            <p className="text-black">
              Email:{" "}
              <span className="font-semibold">
                {userInfo.email || "0"}
              </span>
            </p>
            <p className="text-black">
            socialHandleName:{" "}
              <span className="font-semibold">
                {userInfo.socialHandleName || ""}
              </span>
            </p>

           
          </div>
          <div className="p-2 flex gap-2 ">
            {
               userInfo.images ?  userInfo.images.map((item,index)=>{
                    return(
                        <div key={index} className="w-1/2">
                            <img src={item} alt="image" className="w-full h-full bg-zinc-500 rounded-md p-2" />
                        </div>
                    )
                })
                :
                <p>
                    no image found
                </p>
            }
          </div>
          
        </div>}
    </div>
  );
};

export default User;
