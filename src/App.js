import AdminLogin from "./pages/admin/AdminLogin";
import VendorLogin from "./pages/vendor/VendorLogin";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes } from 'react-router-dom';
import Loginsuccess from "./components/Common/Loginsuccess";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import AdminHome from "./pages/admin/AdminHome";
import ProtectedRoutes from "./protectedRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuthStatus } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus());
}, [dispatch])

  return (
    <div className="App">

      <Routes>
        {/* ADMIN routes */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />
        <Route path="/login-success" element={<Loginsuccess />} />
        <Route path="/admin/home" element={<ProtectedRoutes requiredRole='admin' ><AdminHome /></ProtectedRoutes>} />


        {/* VENDOR routes */}
        <Route path="/vendor/auth/login" element={<VendorLogin />} />
        <Route path="/login-success" element={<Loginsuccess />} />


        {/* USER routes */}
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/auth/signup" element={<UserSignup />} />
        <Route path="/login-success" element={<Loginsuccess />} />


      </Routes>


    </div>
  );
}

export default App;
