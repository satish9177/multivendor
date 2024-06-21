import { useReducer } from "react";
import { Provider } from "./contextprovider.jsx";
const initial = {
  Vname: "",
  number: "",
  email: "",
  password: "",
};
const Register = () => {
  const { Login } = Provider();

  const reducefun = (state, { type, payload }) => {
    switch (type) {
      case "Vname":
        return {
          ...state,
          Vname: payload,
        };
      case "NUM":
        return {
          ...state,
          number: payload,
        };
      case "EMAIL":
        return {
          ...state,
          email: payload,
        };
      case "PASS":
        return {
          ...state,
          password: payload,
        };
      case "CLEAR":
        return {
          Vname: "",
          number: "",
          email: "",
          password: "",
        };
      default:
        return state;
    }
  };
  const VNAME = (e) => {
    dispatch({
      type: "Vname",
      payload: e.target.value,
    });
  };
  const NUM = (e) => {
    dispatch({
      type: "NUM",
      payload: e.target.value,
    });
  };
  const EMAIL = (e) => {
    dispatch({
      type: "EMAIL",
      payload: e.target.value,
    });
  };
  const PASS = (e) => {
    dispatch({
      type: "PASS",
      payload: e.target.value,
    });
  };
  const CLEAR = () => {
    dispatch({
      type: "CLEAR",
    });
  };
  const [{ Vname, number, email, password }, dispatch] = useReducer(
    reducefun,
    initial
  );
  const SUBMIT = async (e) => {
    e.preventDefault();

    await fetch("https://store-backend-1zpn.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: Vname,
        number: number,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log("success");
          alert("registered successfully");
          CLEAR();
          Login();
        } else {
          console.log("Failed");
          alert("registered failed");
        }
        res.json();
      })
      .then((data) => console.log(data))
      .catch((err) => {
        console.log(err);
        alert("api not fetch");
      });

    // console.log(ty)
  };
  //  console.log(Vname,number,email,password)
  return (
    <div className=" flex flex-col fixed top-36 h-[450px] w-96  right-1/3 rounded-lg p-5 border-2 text-center drop-shadow-2xl">
      <h1 className="font-medium text-2xl pb-4">Vender Register</h1>
      <form
        action=""
        className="flex flex-col gap-2 text-left font-normal text-lg"
        onSubmit={SUBMIT}
      >
        <label htmlFor="">VenderName</label>
        <input
          type="text"
          placeholder="enter name"
          value={Vname}
          onChange={VNAME}
          className=" outline-none border-2 border-black rounded-md pl-1"
        />
        <label htmlFor="">Number</label>
        <input
          type="text"
          placeholder="enter number"
          value={number}
          onChange={NUM}
          className=" outline-none border-2 border-black rounded-md pl-1"
        />
        <label htmlFor="">Email</label>
        <input
          type="text"
          placeholder="enter email"
          value={email}
          onChange={EMAIL}
          className=" outline-none border-2 border-black rounded-md pl-1"
        />
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="enter password"
          value={password}
          onChange={PASS}
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

export default Register;
