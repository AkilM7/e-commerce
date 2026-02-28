import { Routes, Route } from "react-router-dom"; 
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import ProductList from "./Pages/ProductList";
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Profile from "./Pages/Profile";
import Orders from "./Pages/Orders";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Shippings from "./Pages/Shippings";
import Returns from "./Pages/Returns";
import TermsConditions from "./Pages/TermsConditions";
import FAQ from "./Pages/Faq";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Category from "./Pages/Category";
import Blog from "./Pages/Blog";
import SocialCallback from './components/SocialCallback';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/auth/callback" element={<SocialCallback />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/shop" element={<ProductList />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/shipping" element={<Shippings />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/terms" element={<TermsConditions />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;