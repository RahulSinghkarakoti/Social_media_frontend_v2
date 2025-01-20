// import { useEffect, useState } from "react";
// import FriendCard from "../FriendCard";
// import { getFriends } from "../../api/userService";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDashboard } from "../api/adminService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserProfile from "../components/UserProfile";

function Home() {
  // const navigate=useNavigate()
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.user.role);
  const [loading,setLoading]=useState(true)
  console.log(role)
  
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
   try {
     const res = await getDashboard();
     setUsers(res.data);
   } catch (error) {
    console.log(error.response.message)
   }finally{
    setLoading(false)
   }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (role != "admin") return <UserProfile />;

  if(loading) return <div> Loading...</div>

  return (
    <div className="flex flex-col  px-4 py-3 space-y-2">
      {user.status ? (
        <>
          <div className="text-3xl font-bold text-zinc-400 text-center">
            <p>WELCOME ADMIN!!</p>
            USERS
          </div>

          <div className="flex flex-wrap gap-3 w-full  ">
            {Array.isArray(users) &&
              users.map((item, index) => {
                return (
                  <div
                    key={index}
                    className=" cursor-pointer bg-red-400 p-2 rounded-md "
                    onClick={() => navigate(`/user/${item._id}`)}
                  >
                    <p>ID: {item._id}</p>
                    <p>Username: {item.username}</p>
                    <p>Email: {item.email}</p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div>
          <div className="text-3xl font-bold text-zinc-400 text-center">
            Please login
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
