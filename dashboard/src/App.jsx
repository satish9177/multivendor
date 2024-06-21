import './App.css'
import Header from './components/header'
import Sidebar from './components/Sidebar'
import Register from './components/Register'
import Login from './components/Login'
import Firm from './components/Firm'
import AllProducts from './components/AllProducts'
import AddProduct from './components/AddProduct'
import { Provider } from './components/contextprovider'
function App() { 
  const {register,login,firm,addproduct,allproduct}=Provider()
  return (
    <div>
     <Header/>
     <div className='flex flex-row'>
     <Sidebar/>
    {register ? <Register/>:<></>}
    {login ? <Login/>:<></>}
    { firm? <Firm/>:<></>}
    {addproduct? <AddProduct/>:<></>}
    {allproduct? <AllProducts/>:<></>}
    </div>
    </div>
  )
}

export default App
