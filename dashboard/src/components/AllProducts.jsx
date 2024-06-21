import { useEffect, useState } from "react";
// import img from '../../idly.png'
import axios from "axios";
const AllProducts = () => {
  const [product, setproduct] = useState();
  const firmId = localStorage.getItem("firmId");
  if (!firmId) console.log("firmid not found");
  useEffect(() => {
    // console.log("jddjk")
    const fetched = async () => {
      const {
        data: { products },
      } = await axios.get(
        `https://store-backend-1zpn.onrender.com/products/getproductbyfirm/${firmId}`
      );
      console.log(products);
      setproduct(products);
    };
    fetched();
  }, []);
  return (
    <div className=" flex flex-col ml-96 h-fit w-[1000px] left-1/4 rounded-lg  border-2 text-center drop-shadow-2xl mb-10 mt-32">
      <table className="table-auto ">
        <thead className="font-semibold border-b-2">
          <tr className="h-10">
            <th className="border-r-2 p-4">Product Name</th>
            <th className="border-r-2">Price</th>
            <th className="border-r-2">Image</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className=" overflow-scroll">
          {product?.length > 0 ? (
            product.map((pr) => {
              return (
                <>
                  <tr className="border-b-2 p-4" key={pr._id}>
                    <td className="border-r-2">{pr.ProductName}</td>
                    <td className="border-r-2">₹{pr.price}</td>
                    <td className="border-r-2 ">
                      {pr.image ? (
                        <img
                          src={`https://store-backend-1zpn.onrender.com/products/upload/${pr.image}`}
                          alt={pr.image}
                          className="w-14 mx-auto"
                        />
                      ) : (
                        <>{pr.ProductName}</>
                      )}
                    </td>
                    <td>
                      <button
                        className="bg-orange-300 p-1 px-3 rounded-xl border-2 m-2 border-solid"
                        onClick={async () => {
                          const data = await axios.delete(
                            `https://store-backend-1zpn.onrender.com/products/getproductbyId/${pr._id}`
                          );
                          //  console.log(data)
                          if (data.status === 200) {
                            setproduct(
                              product.filter((value) => value._id !== pr._id)
                            );
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllProducts;
