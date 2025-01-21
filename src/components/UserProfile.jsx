 
import { useSelector } from "react-redux";
import UploadImage from "./UploadImage";

function UserProfile() {
  const userInfo = useSelector((state) => state.user.user);
 
  return (
    <div className="  flex justify-center  items-center p-3 bg-pink-400">
      <div className="flex flex-col justify-between   gap-3 text-lg w-2/3  bg-red-100 p-2  text-zinc-600">
        <div className="rounded-xl p-2  ">
          <h1 className="text-4xl font-bold text-zinc-700 text-center"></h1>
          <p className="text-black ">
            ID: <span className="font-semibold">{userInfo._id}</span>
          </p>

          <p className="text-black">
            Name:{" "}
            <span className=" font-semibold">{userInfo.username || "N/A"}</span>
          </p>
          <p className="text-black">
            Email:{" "}
            <span className="font-semibold">{userInfo.email || "0"}</span>
          </p>
          <p className="text-black">
            socialHandleName:{" "}
            <span className="font-semibold">
              {userInfo.socialHandleName || ""}
            </span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-black text-3xl font-semibold"> Uploded Images: </p>
          <div>
            <UploadImage   />
          </div>
        </div>
        <div className="p-2 grid grid-cols-2 gap-2">
  {userInfo.images ? (
    userInfo.images.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <img
            src={item}
            alt="image"
            className="bg-zinc-500 h-full rounded-md p-2"
          />
        </div>
      );
    })
  ) : (
    <p>No images available</p>
  )}
</div>

      </div>
    </div>
  );
}

export default UserProfile;
