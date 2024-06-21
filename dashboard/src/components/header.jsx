import { Provider } from "./contextprovider.jsx";
import { useEffect, useState } from "react";
const Header = () => {
  const { Login, Register } = Provider();
  const [logout, setlogout] = useState(localStorage.getItem("token") !== null);

  // const token=localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setlogout(true);
    }
  }, []);
  const Handlelogout = () => {
    const data = confirm("are you sure to logout");
    //  console.log(data)
    if (data) {
      localStorage.removeItem("token");
      localStorage.removeItem("firmId");
      localStorage.removeItem("firmname");
      setlogout(false);
      window.location.reload();
    }
  };
  return (
    <header className="flex flex-row justify-between items-center h-24 bg-orange-500  pl-10 pr-20 text-white fixed top-0  z-20 w-screen">
      <h1 className="font-bold text-4xl cursor-pointer">Vendor dashboard</h1>
      <span className="font-medium text-xl">
        Firname:
        {localStorage.getItem("firmname") !== null ? (
          localStorage.getItem("firmname")
        ) : (
          <></>
        )}
      </span>
      <div className="font-normal text-xl">
        {!logout ? (
          <>
            <button onClick={Register}>Register/</button>
            <button onClick={Login}>Login</button>
          </>
        ) : (
          <button onClick={Handlelogout}>Logout</button>
        )}
      </div>
    </header>
  );
};

export default Header;
