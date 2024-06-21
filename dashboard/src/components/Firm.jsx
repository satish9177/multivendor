import { useState } from "react";
const Firm = () => {
  const [name, setname] = useState("");
  const [area, setarea] = useState("");
  const [category, setcategory] = useState([]);
  const [offer, setoffer] = useState("");
  const [region, setregion] = useState([]);
  const [image, setimage] = useState(null);
  const Handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token not found");
      }
      //  console.log(name,area,category,offer,region,image)
      const formdata = new FormData();
      formdata.append("firmname", name);
      formdata.append("area", area);
      formdata.append("offer", offer);
      formdata.append("image", image);
      category.forEach((ct) => {
        formdata.append("category", ct);
      });
      region.forEach((ct) => {
        formdata.append("region", ct);
      });
      // console.log(formdata)
      const res = await fetch("https://store-backend-1zpn.onrender.com/data/firm", {
        method: "POST",
        headers: {
          token: `${token}`,
        },
        body: formdata,
      });

      const data = await res.json();

      if (res.ok) {
        console.log(data);
        alert("firm added successfully");
        localStorage.setItem("firmId", data.firmid);
        localStorage.setItem("firmname", name);
        setname("");
        setarea("");
        setcategory([]);
        setimage(null);
        setoffer("");
        setregion([]);
        window.location.reload();
      } else if (data.message == "already firm is existed") {
        alert("already firm is existed");
        console.log("firm should be only one");
      } else {
        console.log("Failed");
        alert("firm not add");
      }
    } catch (err) {
      console.log(err);
      alert("api not fetch");
    }
  };
  const Handlecategory = (e) => {
    const t = e.target.value;
    if (category.includes(t)) {
      setcategory(category.filter((v) => v !== t));
      console.log(category);
    } else {
      setcategory([...category, t]);
    }
  };
  const Handleregion = (e) => {
    const t = e.target.value;
    if (region.includes(t)) {
      setregion(region.filter((v) => v !== t));
    } else {
      setregion([...region, t]);
    }
  };
  const HandleImage = (e) => {
    const tp = e.target.files[0];
    console.log(e.target.files[0].name, "hi");
    setimage(tp);
  };
  return (
    <div className=" flex flex-col fixed top-28 h-fit w-[500px] right-1/4 rounded-lg py-2 px-5 border-2 text-center drop-shadow-2xl">
      <h1 className="font-medium text-2xl pb-3">Add Firm</h1>
      <form
        action=""
        className="flex flex-col gap-2 text-left font-normal text-lg"
        onSubmit={Handlesubmit}
      >
        <label htmlFor="">Firm Name</label>
        <input
          type="text"
          placeholder="enter name"
          className=" outline-none border-2 border-black rounded-md pl-1"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
        <label htmlFor="">Area</label>
        <input
          type="text"
          placeholder="enter area"
          className=" outline-none border-2 border-black rounded-md pl-1"
          value={area}
          onChange={(e) => setarea(e.target.value)}
        />
        <div className="flex items-center">
          <span>Category</span>
          <div className="flex gap-5 ml-28 justify-evenly">
            <div className="flex text-base gap-2">
              <label htmlFor="">Veg</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                value="veg"
                checked={category.includes("veg")}
                onClick={Handlecategory}
              />
            </div>
            <div className="flex text-base gap-2">
              <label htmlFor="">non-Veg</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                value="non-veg"
                checked={category.includes("non-veg")}
                onChange={Handlecategory}
              />
            </div>
          </div>
        </div>
        <label htmlFor="">Offer</label>
        <input
          type="text"
          placeholder="enter Category"
          className=" outline-none border-2 border-black rounded-md pl-1 "
          value={offer}
          onChange={(e) => setoffer(e.target.value)}
        />
        <div className="flex gap-4 items-center">
          <span className="mr-10">Region</span>
          {/* "south-indian","north-indian","chinese","bakery" */}
          <div className="flex text-base flex-col">
            <label htmlFor="">north-Indian</label>
            <input
              type="checkbox"
              className="h-6 cursor-pointer"
              value="north-indian"
              checked={region.includes("north-indian")}
              onChange={Handleregion}
            />
          </div>
          <div className="flex text-base flex-col">
            <label htmlFor="">south-Indian</label>
            <input
              type="checkbox"
              className="h-6 cursor-pointer"
              value="south-indian"
              checked={region.includes("south-indian")}
              onChange={Handleregion}
            />
          </div>
          <div className="flex text-base flex-col">
            <label htmlFor="">Chinese</label>
            <input
              type="checkbox"
              className="h-6 cursor-pointer"
              value="chinese"
              checked={region.includes("chinese")}
              onChange={Handleregion}
            />
          </div>
          <div className="flex text-base flex-col">
            <label htmlFor="">Bakery</label>
            <input
              type="checkbox"
              className="h-6 cursor-pointer"
              value="bakery"
              checked={region.includes("bakery")}
              onChange={Handleregion}
            />
          </div>
        </div>
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={HandleImage} />
        <button
          type="submit"
          className="w-40 pt-1 pb-3 mt-5 bg-violet-950 rounded-lg text-white m-auto"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Firm;
