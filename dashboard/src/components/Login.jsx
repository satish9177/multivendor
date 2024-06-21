import { useState } from "react";
import { Provider } from "./contextprovider.jsx";
const Login = () => {
  const { Firm } = Provider();
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  const SUBMIT = async (e) => {
    e.preventDefault();
    // console.log(password,number)
    // console.log("hi")
    try {
      const resp = await fetch("https://store-backend-1zpn.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: number,
          password: password,
        }),
      });
      const data = await resp.json();
      if (resp.ok) {
        console.log("success");
        alert("Login successfully");
        setnumber("");
        setpassword("");
        localStorage.setItem("token", data.token);
        //  if(data.firmId.length>0) localStorage.setItem("firmId",data.firmId[0])
        Firm();
      } else {
        console.log("Failed");
        alert("Login failed");
      }
      const firmresp = await fetch(
        `https://store-backend-1zpn.onrender.com/auth/getuserdata/${data.userId}`
      );
      const firmdata = await firmresp.json();
      if (firmresp.ok && firmdata.firm.length > 0) {
        console.log(firmdata.firm[0]._id);
        localStorage.setItem("firmId", firmdata.firm[0]._id);
        // Firmname(firmdata.firm[0].firmname)
        localStorage.setItem("firmname", firmdata.firm[0].firmname);
      } else {
        console.log("no firm data is added");
      }
      if (resp.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
      alert("api not fetch");
    }
  };
  // console.log(password,number)

  return (
    <div className=" flex flex-col fixed top-36 h-[350px] w-96  right-1/3 rounded-lg p-5 border-2 text-center drop-shadow-2xl">
      <h1 className="font-medium text-2xl pb-6">Vender Login</h1>
      <form
        action=""
        className="flex flex-col gap-2 text-left font-normal text-lg"
        onSubmit={SUBMIT}
      >
        <label htmlFor="">Number</label>
        <input
          type="text"
          placeholder="enter number"
          value={number}
          onChange={(e) => setnumber(e.target.value)}
          className=" outline-none border-2 border-black rounded-md pl-1"
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          className=" outline-none border-2 border-black rounded-md pl-1"
        />
        <button
          type="submit"
          className="w-40 p-2 mt-5 bg-violet-950 rounded-lg text-white m-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
