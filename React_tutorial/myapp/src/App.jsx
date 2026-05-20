import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import LoginSuccess from "./components/LoginSuccess";
import Help from "./components/Help";
import CustomerService from "./components/CustomerService";
import ShowServices from "./components/ShowServices";
import MapComponent from "./components/MapComponent";
import { useSelector } from "react-redux";
import { useGeolocation } from "./Hooks/useGeolocation";
import  Home from "./components/Home";
import Login from "./components/Login";
import { measureDistance } from "./Hooks/measureDistance";

function App() {

      useGeolocation();
      measureDistance();


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/success" element={<LoginSuccess/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/customerservice" element={<CustomerService/>}/>
        <Route path="/showservices" element={<ShowServices/>}/>
        <Route path="/mapcomponent" element={<MapComponent/>}/>
        <Route path="/showlogin" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}


export default App;