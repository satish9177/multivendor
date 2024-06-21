import { useState } from "react";
// ProductName, price , category, image , bestseller, description , firm
const AddProduct = () => {
  const [ProductName, setProductName] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState([]);
  const [image, setimage] = useState(null);
  const [bestseller, setbestseller] = useState([]);
  const [description, setdescription] = useState("");
  const Handlecategory = (e) => {
    const value = e.target.value;
    if (category.includes(value)) {
      setcategory(category.filter((v) => value !== v));
    } else {
      setcategory([...category, value]);
    }
  };
  const Handleseller = (e) => {
    const value = e.target.value;
    // if(bestseller.includes(value)){
    //   setbestseller(bestseller.filter( v=> value!==v))
    // }else{
    setbestseller([value]);
    // }
  };
  const HandleImage = (e) => {
    const value = e.target.files[0];
    // if(bestseller.includes(value)){
    //   setbestseller(bestseller.filter( v=> value!==v))
    // }else{
    setimage(value);
    // }
  };
  const Handlesubmit = async (e) => {
    e.preventDefault();
    const firmId = localStorage.getItem("firmId");
    if (!firmId) console.log("firmid not found");
    // else console.log(firmId ,"is firm id")
    try {
      // ProductName, price , category, image , bestseller, description , firm
      const formdata = new FormData();
      formdata.append("ProductName", ProductName);
      formdata.append("price", price);
      formdata.append("description", description);
      formdata.append("image", image);
      category.forEach((ct) => {
        formdata.append("category", ct);
      });
      bestseller.forEach((ct) => {
        formdata.append("bestseller", ct);
      });
      // console.log(formdata)
      const res = await fetch(
        `https://store-backend-1zpn.onrender.com/products/addproduct/${firmId}`,
        {
          method: "POST",
          headers: {
            "Context-Type": "application/json",
          },
          body: formdata,
        }
      );
      const data = await res.json();

      if (res.ok) {
        console.log(data);
        alert("product added successfully");
        setProductName("");
        setbestseller([]);
        setcategory([]);
        setdescription("");
        setimage(null);
        setprice("");
      } else {
        console.log("Failed");
        alert("product not add");
      }
    } catch (err) {
      console.log(err);
      alert("api not fetch", err);
    }
  };
  return (
    <div className=" flex flex-col fixed top-28 h-fit w-[500px] right-1/4 rounded-lg py-2 px-5 border-2 text-center drop-shadow-2xl">
      <h1 className="font-bold text-2xl pb-3">Add Product</h1>
      <form
        action=""
        className="flex flex-col gap-1 text-left font-medium text-lg"
        onSubmit={Handlesubmit}
      >
        <label htmlFor="">Product Name</label>
        <input
          type="text"
          placeholder="enter name"
          className=" outline-none border-2 border-black rounded-md mb-3"
          value={ProductName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <label htmlFor="">Price</label>
        <input
          type="text"
          placeholder="enter price"
          className=" outline-none border-2 border-black rounded-md mb-3"
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <div className="flex items-center mb-2">
          <span>Category</span>
          <div className="flex gap-7 ml-28 justify-evenly">
            <div className="flex text-base gap-2">
              <label htmlFor="">Veg</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                value={"veg"}
                checked={category.includes("veg")}
                onChange={Handlecategory}
              />
            </div>
            <div className="flex text-base gap-2">
              <label htmlFor="">non-Veg</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                value={"non-veg"}
                checked={category.includes("non-veg")}
                onChange={Handlecategory}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center mb-3">
          <span className="mr-10">Best Seller</span>
          <div className="flex gap-16 ml-12 justify-evenly">
            <div className="flex text-base gap-3 ">
              <label htmlFor="">Yes</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer "
                value={"yes"}
                checked={bestseller.includes("yes")}
                onChange={Handleseller}
              />
            </div>
            <div className="flex text-base gap-3 ">
              <label htmlFor="">No</label>
              <input
                type="checkbox"
                className="w-6 cursor-pointer"
                value={"No"}
                checked={bestseller.includes("No")}
                onChange={Handleseller}
              />
            </div>
          </div>
        </div>
        <label htmlFor="">Description</label>
        <input
          type="text"
          placeholder="enter name"
          className=" outline-none border-2 border-black rounded-md pl-1 mb-3"
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
        <label htmlFor="">Firm Image</label>
        <input type="file" onChange={HandleImage} />
        <button
          type="submit"
          className="w-40 p-2 mb-2 bg-violet-950 rounded-lg text-white mx-auto mt-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
