import {Provider} from './contextprovider.jsx'
const Sidebar = () => {
  const {Firm,Addproduct,Allproduct}=Provider()
  return (
    <aside className="flex flex-col gap-10 items-center py-10 w-52 h-[600px] bg-violet-950 text-2xl text-white fixed top-24">
      { !localStorage.getItem("firmId")?
        <button onClick={Firm}>Add Firm</button>:<></>}
      <button onClick={Addproduct}>Add Product</button>
      <button onClick={Allproduct}>All Product</button>
      <button>User details</button>
    </aside>
  )
}

export default Sidebar