import HomePage from "./pages/HomePage";
import Report from "../src/pages/ReportPage";
import AddReport from "./pages/AddReportPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import {Routes, Route, useLocation} from "react-router-dom";
import Navbar from "../src/components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import React, { useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { userAPI } from "./lib/api";


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const { userId: clerkId, isSignedIn, isLoaded, getToken } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    const syncUser = async () => {
      try {
        const token = typeof getToken === "function" ? await getToken() : null;
        const name = user?.fullName || [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "";
        const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress || "";
        await userAPI.getOrCreateUser(clerkId, name, email, [0, 0], token);
      } catch (err) {
        console.error("Failed to sync user to backend:", err);
      }
    };

        syncUser();
  }, [isLoaded, isSignedIn, clerkId, user, getToken]);

  
  return (
    <>
      {!isAuthPage && <Navbar/>}
      <Routes>
        <Route path="/sign-in" element={
          <PublicRoute>
            <SignInPage/>
          </PublicRoute>
        } />
        <Route path="/sign-up/*" element={
          <PublicRoute>
            <SignUpPage/>
          </PublicRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage/>
          </ProtectedRoute>
        }/>
        <Route path="/reports" element={
          <ProtectedRoute>
            <Report/>
          </ProtectedRoute>
        }/>
        <Route path="/addReports" element={
          <ProtectedRoute>
            <AddReport/>
          </ProtectedRoute>
        }/>
      </Routes>
    </>
  )
}

export default App
