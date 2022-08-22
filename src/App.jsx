import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home Page/Home.jsx";
import "./App.css";
import SpecificProduct from "./pages/Specific Product Details/SpecificProduct";
import AllCategoryProduct from "./pages/All Category Products/AllCategoryProduct";
import AddProduct from "./pages/Add Product/AddProduct";
import {  UserProvider } from "./contex/UserContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import _404 from "./pages/_404/_404";
import Footer from "./components/Footer/Footer";



function App() {
  return (
         <GoogleOAuthProvider clientId="595136115089-bjbmraoj1vhrmqhgqi2op3lcttaikr3v.apps.googleusercontent.com">

      <UserProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route exact path="/product/:tag/:id" element={<SpecificProduct />} />
            <Route exact path="/products/:tag" element={<AllCategoryProduct />} />
            <Route exact path="/products/addproduct" element={<AddProduct />} />
            <Route path="*" element={<_404 />} />

          </Routes>
          <Footer/>
        </BrowserRouter>
      </UserProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
