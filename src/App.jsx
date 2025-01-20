import { useSelector } from "react-redux";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";

export default function App() {
  const loginStatus = useSelector((state) => state.user.status);
   
  console.log(loginStatus);

  // if (!loginStatus) return <div>please login</div>;

  return (
    <div className="">
      <Header />
      {
      !loginStatus ? <div className="text-center text-zinc-400 font-semibold text-4xl">Please login</div> : <Outlet />}
    </div>
  );
}
