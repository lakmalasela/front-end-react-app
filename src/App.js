import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import Navcomponent from './components/Navcomponent';
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./components/Login";
import AppRoutes from "./routes/AppRoutes";


function App() {

  // useEffect(()=>{

  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/postman/getval"
  //       );

  //       console.log("GET DATA SPRING ",response.data);
        
       
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
       
  //     }
  //   };

  //   fetchCategories();

  // },[])
 
  return (
    // <div>
   
    //   <Navcomponent/>
    //   <h1>HI JS </h1>
    //   {/* <Navcomponent></Navcomponent> */}
    // </div>
    <AuthProvider>
    {/* <Login /> */}
    <AppRoutes />
  </AuthProvider>
  );
}

export default App;
