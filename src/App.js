import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "./redux/slices/authSlice";
import UserLogin from "./pages/user/UserLogin";
import UserSignup from "./pages/user/UserSignup";
import AdminHome from "./pages/admin/AdminHome";
import ProtectedRoutes from "./protectedRoutes";
import AdminLogin from "./pages/admin/AdminLogin";
import VendorLogin from "./pages/vendor/VendorLogin";
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
import ActivatedApplicationsPage from "./pages/admin/ActivatedApplicationsPage";
import VendorActivationPage from "./pages/user/VendorActivationPage";
import VendorHomePage from "./pages/vendor/VendorHomePage";
import VendorProfilePage from "./pages/vendor/VendorProfilePage";
import VendorCreatePackagePage from "./pages/vendor/VendorCreatePackagePage";
import VendorPendingPackagesPage from "./pages/vendor/VendorPendingPackagesPage";
import VendorApprovedPackages from "./pages/vendor/VendorApprovedPackages";
import VendorRejectedPackages from "./pages/vendor/VendorRejectedPackages";
import VendorInactivePackages from "./pages/vendor/VendorInactivePackages";
import VendorViewPackagePage from "./pages/vendor/VendorViewPackagePage";
import AdminViewPendingPackages from "./pages/admin/AdminViewPendingPackages";
import AdminViewApprovedPackages from "./pages/admin/AdminViewApprovedPackages";
import AdminViewRejectedPackages from "./pages/admin/AdminViewRejectedPackages";
import AdminViewActivePackages from "./pages/admin/AdminViewActivePackages";
import AdminViewInactivePackages from "./pages/admin/AdminViewInactivePackages";
import AdminViewPackagePage from "./pages/admin/AdminViewPackagePage";
import UserViewPackagePage from "./pages/user/UserViewPackagePage";
import VendorActivePackages from "./pages/vendor/VendorActivePackages";
import UserChatPage from "./pages/user/UserChatPage";
import VendorChatPage from "./pages/vendor/VendorChatPage";
import UserViewBookingsPage from "./pages/user/UserViewBookingsPage";
import UserViewBookingDetailsPage from "./pages/user/UserViewBookingDetailsPage";
import VendorViewPendingBookingsPage from "./pages/vendor/VendorViewPendingBookingsPage";
import VendorViewBookingDetailsPage from "./pages/vendor/VendorViewBookingDetailsPage";
import VendorViewApprovedBookingsPage from "./pages/vendor/VendorViewApprovedBookingsPage";
import VendorViewRejectedBookingsPage from "./pages/vendor/VendorViewRejectedBookingsPage";
import VendorEditProfilePage from "./pages/vendor/VendorEditProfilePage";
import NotificationSidebar from "./components/Common/NotificationSideBar/NotificationSidebar";
import UserViewCategoryPackagesPage from "./pages/user/UserViewCategoryPackagesPage";
import UserFindPackagesPage from "./pages/user/UserFindPackagesPage";
import AdminViewPackagesByVendorPage from "./pages/admin/AdminViewPackagesByVendorPage";
import AdminViewPackageBookingsPage from "./pages/admin/AdminViewPackageBookingsPage";
import UserViewFavourites from "./pages/user/UserViewFavourites";
import VendorViewPackageBookingsPage from './pages/vendor/VendorViewPackageBookingsPage'
import AdminViewBookingDetailsPage from "./pages/admin/AdminViewBookingDetailsPage";
import VendorEditPackagePage from "./pages/vendor/VendorEditPackagePage";
import UserViewPaymentsPage from "./pages/user/UserViewPaymentsPage";
import VendorViewPaymentsPage from "./pages/vendor/VendorViewPaymentsPage";
import VendorExpiredPackagesPage from "./pages/vendor/VendorExpiredPackagesPage";
import AdminViewExpiredPackages from "./pages/admin/AdminViewExpiredPackages";
import AdminViewAllPaymentsPage from "./pages/admin/AdminViewAllPaymentsPage";
import UserViewVendorProfilePage from "./pages/user/UserViewVendorProfilePage";

function App() {
  const dispatch = useDispatch()
  const { userRole } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch])

  return (
    <div className="App">

      <Routes>
        {/* ADMIN routes */}
        <Route path="/admin/auth/login" element={<AdminLogin />} />
        <Route path="/admin/home" element={<ProtectedRoutes requiredRole='admin' ><AdminHome /></ProtectedRoutes>} />
        <Route path="/admin/active-vendors" element={<ProtectedRoutes requiredRole='admin' ><AllVendors /></ProtectedRoutes>} />
        <Route path="/admin/disabled-vendors" element={<ProtectedRoutes requiredRole='admin' ><DisabledVendors /></ProtectedRoutes>} />
        <Route path="/admin/pending-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><PendingApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/approved-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><ApprovedApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/rejected-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><RejectedApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/activated-vendor-applications" element={<ProtectedRoutes requiredRole='admin' ><ActivatedApplicationsPage /></ProtectedRoutes>} />
        <Route path="/admin/view-application/:id" element={<ProtectedRoutes requiredRole='admin' ><AdminViewApplicationPage /></ProtectedRoutes>} />
        <Route path="/admin/view-vendor/:vendorId" element={<ProtectedRoutes requiredRole='admin' ><ViewVendor /></ProtectedRoutes>} />
        <Route path="/admin/edit-vendor/:vendorId" element={<ProtectedRoutes requiredRole='admin' ><EditVendorPage /></ProtectedRoutes>} />
        <Route path="/admin/users" element={<ProtectedRoutes requiredRole='admin' ><ViewUsers /></ProtectedRoutes>} />
        <Route path="/admin/users/user-account/:userId" element={<ProtectedRoutes requiredRole='admin' ><ViewUserAccount /></ProtectedRoutes>} />
        <Route path="/admin/users/create-user" element={<ProtectedRoutes requiredRole='admin' ><CreateUserPage /></ProtectedRoutes>} />
        <Route path="/admin/users/edit-user/:userId" element={<ProtectedRoutes requiredRole='admin' ><EditUserPage /></ProtectedRoutes>} />
        <Route path="/admin/pending-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewPendingPackages /></ProtectedRoutes>} />
        <Route path="/admin/approved-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewApprovedPackages /></ProtectedRoutes>} />
        <Route path="/admin/rejected-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewRejectedPackages /></ProtectedRoutes>} />
        <Route path="/admin/active-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewActivePackages /></ProtectedRoutes>} />
        <Route path="/admin/inactive-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewInactivePackages /></ProtectedRoutes>} />
        <Route path="/admin/expired-packages" element={<ProtectedRoutes requiredRole='admin' ><AdminViewExpiredPackages /></ProtectedRoutes>} />
        <Route path="/admin/view-package/:id" element={<ProtectedRoutes requiredRole='admin' ><AdminViewPackagePage /></ProtectedRoutes>} />
        <Route path="/admin/view-packages-by-vendor/:vendorId" element={<ProtectedRoutes requiredRole='admin' ><AdminViewPackagesByVendorPage /></ProtectedRoutes>} />
        <Route path="/admin/view-bookings-by-package/:packageId" element={<ProtectedRoutes requiredRole='admin' ><AdminViewPackageBookingsPage /></ProtectedRoutes>} />
        <Route path="/admin/view-booking-details/:bookingId" element={<ProtectedRoutes requiredRole='admin' ><AdminViewBookingDetailsPage /></ProtectedRoutes>} />
        <Route path="/admin/view-all-payments" element={<ProtectedRoutes requiredRole='admin' ><AdminViewAllPaymentsPage /></ProtectedRoutes>} />


        {/* VENDOR routes */}
        <Route path="/vendor/auth/login" element={<VendorLogin />} />
        <Route path="/vendor" element={<ProtectedRoutes requiredRole='vendor' > <VendorHomePage /></ProtectedRoutes>} />
        <Route path="/vendor/profile" element={<ProtectedRoutes requiredRole='vendor' > <VendorProfilePage /></ProtectedRoutes>} />
        <Route path="/vendor/create-package" element={<ProtectedRoutes requiredRole='vendor' > <VendorCreatePackagePage /></ProtectedRoutes>} />
        <Route path="/vendor/pending-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorPendingPackagesPage /></ProtectedRoutes>} />
        <Route path="/vendor/approved-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorApprovedPackages /></ProtectedRoutes>} />
        <Route path="/vendor/rejected-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorRejectedPackages /></ProtectedRoutes>} />
        <Route path="/vendor/inactive-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorInactivePackages /></ProtectedRoutes>} />
        <Route path="/vendor/active-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorActivePackages /></ProtectedRoutes>} />
        <Route path="/vendor/expired-packages" element={<ProtectedRoutes requiredRole='vendor' > <VendorExpiredPackagesPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-package/:id" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewPackagePage /></ProtectedRoutes>} />
        <Route path="/vendor/inbox" element={<ProtectedRoutes requiredRole='vendor' > <VendorChatPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-pending-bookings" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewPendingBookingsPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-approved-bookings" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewApprovedBookingsPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-rejected-bookings" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewRejectedBookingsPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-bookings-by-package/:packageId" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewPackageBookingsPage /></ProtectedRoutes>} />
        <Route path="/vendor/view-booking-details/:bookingId" element={<ProtectedRoutes requiredRole='vendor' > <VendorViewBookingDetailsPage /></ProtectedRoutes>} />
        <Route path="/vendor/edit-profile" element={<ProtectedRoutes requiredRole='vendor' > <VendorEditProfilePage /></ProtectedRoutes>} />
        <Route path="/vendor/edit-package/:packageId" element={<ProtectedRoutes requiredRole='vendor' ><VendorEditPackagePage /> </ProtectedRoutes>} />
        <Route path="/vendor/all-payments" element={<ProtectedRoutes requiredRole='vendor' ><VendorViewPaymentsPage /> </ProtectedRoutes>} />


        {/* USER routes */}
        <Route path="/auth/login" element={<UserLogin />} />
        <Route path="/auth/signup" element={<UserSignup />} />
        <Route path="/" element={
          userRole === 'vendor' ? (
            <Navigate to='/vendor' replace />
          ) : userRole === 'admin' ? (
            <Navigate to='/admin/home' replace />
          ) : (
            < UserHomePage />
          )
        } />
        <Route path="/profile" element={<ProtectedRoutes requiredRole='user' ><ProfilePage /></ProtectedRoutes>} />
        <Route path="/edit-profile" element={<ProtectedRoutes requiredRole='user' ><EditProfilePage /></ProtectedRoutes>} />
        <Route path="/vendor-application" element={<ProtectedRoutes requiredRole='user' ><VendorApplicationPage /></ProtectedRoutes>} />
        <Route path="/view-my-vendor-application" element={<ProtectedRoutes requiredRole='user' ><ViewVendorApplicationPage /></ProtectedRoutes>} />
        <Route path="/activate-vendor-account/:applicationId" element={<ProtectedRoutes requiredRole='user' ><VendorActivationPage /></ProtectedRoutes>} />
        <Route path="/view-package/:id" element={<UserViewPackagePage />} />
        <Route path="/packages-by-category/:category" element={<UserViewCategoryPackagesPage />} />
        <Route path="/find-packages" element={<UserFindPackagesPage />} />
        <Route path="/vendor-profile/:vendorId" element={<UserViewVendorProfilePage />} />
        <Route path="/inbox" element={<ProtectedRoutes requiredRole='user' ><UserChatPage /></ProtectedRoutes>} />
        <Route path="/my-bookings" element={<ProtectedRoutes requiredRole='user' ><UserViewBookingsPage /></ProtectedRoutes>} />
        <Route path="/view-booking-details/:bookingId" element={<ProtectedRoutes requiredRole='user' ><UserViewBookingDetailsPage /></ProtectedRoutes>} />
        <Route path="/favorites" element={<ProtectedRoutes requiredRole='user' ><UserViewFavourites /></ProtectedRoutes>} />
        <Route path="/my-payments" element={<ProtectedRoutes requiredRole='user' ><UserViewPaymentsPage /></ProtectedRoutes>} />


      </Routes>

      <NotificationSidebar />

    </div>
  );
}

export default App;
