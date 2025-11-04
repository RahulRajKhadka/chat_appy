import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/Loginpage.jsx";
import SignupPage  from "./pages/SignUppage.jsx";
import  ChatPage  from "./pages/Chatpage.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import PageLoader from "./components/PageLoader.jsx";
import { Toaster } from "react-hot-toast";
import { Navigate } from "react-router-dom";


function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  console.log("Auth User:", authUser, "Checking Auth:", isCheckingAuth);

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignupPage />}
        />
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
