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
import AllVendors from "./pages/admin/AllVendors";
import ViewVendor from "./pages/admin/ViewVendor";
import DisabledVendors from "./pages/admin/DisabledVendors";
import ViewUsers from "./pages/admin/ViewUsers";
import ViewUserAccount from "./pages/admin/ViewUserAccount";
import CreateUserPage from "./pages/admin/CreateUserPage";
import EditUserPage from "./pages/admin/EditUserPage";
import EditVendorPage from "./pages/admin/EditVendorPage";
import UserHomePage from "./pages/user/UserHomePage";
import ProfilePage from "./pages/user/ProfilePage";
import EditProfilePage from "./pages/user/EditProfilePage";
import VendorApplicationPage from "./pages/user/VendorApplicationPage";
import ViewVendorApplicationPage from "./pages/user/ViewVendorApplicationPage";
import PendingApplicationsPage from "./pages/admin/PendingApplicationsPage";
import RejectedApplicationsPage from "./pages/admin/RejectedApplicationsPage";
import ApprovedApplicationsPage from "./pages/admin/ApprovedApplicationsPage";
import AdminViewApplicationPage from "./pages/admin/AdminViewApplicationPage";

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
        <Route path="/admin/active-vendors" element={<ProtectedRoutes requiredRole='admin' ><AllVendors /></ProtectedRoutes>} />
        <Route path="/admin/disabled-vendors" element={<ProtectedRoutes requiredRole='admin' ><DisabledVendors /></ProtectedRoutes>} />
        <Route path="/admin/pending-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><PendingApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/approved-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><ApprovedApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/rejected-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><RejectedApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/view-application/:id" element={<ProtectedRoutes requiredRole='admin' ><AdminViewApplicationPage /></ProtectedRoutes>} />
        <Route path="/admin/view-vendor/:vendorId" element={<ProtectedRoutes requiredRole='admin' ><ViewVendor /></ProtectedRoutes>} />
        <Route path="/admin/edit-vendor/:vendorId" element={<ProtectedRoutes requiredRole='admin' ><EditVendorPage /></ProtectedRoutes>} />
        <Route path="/admin/users" element={<ProtectedRoutes requiredRole='admin' ><ViewUsers /></ProtectedRoutes>} />
        <Route path="/admin/users/user-account/:userId" element={<ProtectedRoutes requiredRole='admin' ><ViewUserAccount /></ProtectedRoutes>} />
        <Route path="/admin/users/create-user" element={<ProtectedRoutes requiredRole='admin' ><CreateUserPage /></ProtectedRoutes>} />
        <Route path="/admin/users/edit-user/:userId" element={<ProtectedRoutes requiredRole='admin' ><EditUserPage /></ProtectedRoutes>} />


        {/* VENDOR routes */}
        <Route path="/vendor/auth/login" element={<VendorLogin />} />
        <Route path="/login-success" element={<Loginsuccess />} />


        {/* USER routes */}
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/auth/signup" element={<UserSignup />} />
        <Route path="/" element={<UserHomePage />} />
        <Route path="/profile" element={<ProtectedRoutes requiredRole='user' ><ProfilePage /></ProtectedRoutes>} />
        <Route path="/edit-profile" element={<ProtectedRoutes requiredRole='user' ><EditProfilePage /></ProtectedRoutes>} />
        <Route path="/vendor-application" element={<ProtectedRoutes requiredRole='user' ><VendorApplicationPage /></ProtectedRoutes>} />
        <Route path="/view-my-vendor-application" element={<ProtectedRoutes requiredRole='user' ><ViewVendorApplicationPage /></ProtectedRoutes>} />


      </Routes>


    </div>
  );
}

export default App;
