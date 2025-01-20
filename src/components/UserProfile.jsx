import React, { useEffect, useState } from 'react'
import { getCurrentUser } from '../api/authServices';
import { useSelector } from 'react-redux';
import UploadImage from './UploadImage';

function UserProfile() {
  
    const userInfo=useSelector(state=>state.user.user)
    console.log(userInfo)
  return (
    <div className="  flex justify-center  items-center p-3 bg-pink-400">
      
    <div className="flex flex-col justify-between   gap-3 text-lg w-3/4 bg-red-100 p-2  text-zinc-600">
      <div className="rounded-xl p-2  ">
        <h1 className="text-4xl font-bold text-zinc-700 text-center">
        

        </h1>
        <p className="text-black ">
          ID: <span className="font-semibold">{userInfo._id}</span>
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
        <div className='flex justify-between items-center' >
          <p className="text-black text-3xl font-semibold" >
            Images Uploded:{" "}
            </p>
            <div>
                 <UploadImage/>
            </div>
           
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
      
    </div>
</div>
  )
}

export default UserProfile
