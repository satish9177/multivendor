import { createContext,useContext,useReducer } from "react"
const context=createContext();
const Contextprovider = (props) => {
  const initial={
    register:false,
    login:false,
    firm:false,
    addproduct:false,
    allproduct:false
  }
  const reducerfun=(state,{type})=>{
   switch(type){
   case "Login":return{
    register:false,
    login:true,
     
    firm:false,
    addproduct:false,
    allproduct:false
   } 
    
   case "Register": return{
    login:false,
    register:true,
    
    firm:false,
    addproduct:false,
    allproduct:false
   }
   case "Firm":return {
    login:false,
    register:false,
     
    firm:true,
    addproduct:false,
    allproduct:false
   }
   case "Addproduct":return {
    login:false,
    register:false,
     
    firm:false,
    addproduct:true,
    allproduct:false
   }
   case "Allproduct":return {
    login:false,
    register:false,
     
    firm:false,
    addproduct:false,
    allproduct:true
   }
  default:return state
  }
  }
  const Login=()=>{
    dispatch({
      type:"Login"
    })
  }
  const Register=()=>{
    dispatch({
      type:"Register"
    })
  }
  const Firm=()=>{
    dispatch({
      type:"Firm"
    })
  }
  const Addproduct=()=>{
    dispatch({
      type:"Addproduct"
    })
  }
  const Allproduct=()=>{
    dispatch({
      type:"Allproduct"
    })
  }
  
  const [{register,login,firm,addproduct,allproduct},dispatch]=useReducer(reducerfun,initial);
  return (
    <context.Provider value={{register,login,firm,addproduct,allproduct,Login,Register,Firm,Addproduct,Allproduct}}>
      {props.children}
    </context.Provider>
  )
}
const Provider=()=>useContext(context);
export { Contextprovider,Provider}