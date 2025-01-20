import { BellDot, CircleUserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login , logout } from "../store/slice";
import { useEffect } from "react";
import { getCurrentUser } from "../api/authServices";

function Header() {
  const user = useSelector((state) => state.user); 
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    const res = await getCurrentUser();
    // console.log(res.data.);
    dispatch(login(res.data.userInfo[0]));
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <div className="  font-semibold flex justify-between items-center gap-2 px-6 py-2">
      <div className="flex justify-between  w-1/3">
        <Link to={"/"} className="font-bold text-4xl ">
          Social.
        </Link>
      </div>
      <div className="  w-2/3 flex justify-end   ">
        {!user.status ? (
          <div className="text-2xl space-x-6 ">
            <Link to={"/auth/login"} className="text-blue-500 ">
              Login
            </Link>
            <Link
              to={"/auth/signup"}
              className="text-white bg-blue-600 hover:bg-blue-500 p-2 px-5 rounded-3xl"
            >
              Signup
            </Link>
          </div>
        ) : (
          <div className=" flex   text-xl space-x-6 ">
            <div
              onClick={() => navigate("/me")}
              className="font-normal flex gap-2 cursor-pointer "
            >
              <CircleUserRound size={35} />
              <p>{user.user.username}</p>
            </div>
            <button
              className="text-white bg-red-600 hover:bg-red-500 p-2  rounded-3xl"
              onClick={() => dispatch(logout())}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
