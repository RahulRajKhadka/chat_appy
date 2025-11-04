import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/Loginpage.jsx";
import SignUpPage from "./pages/SignUppage.jsx";
import ChatPage from "./pages/Chatpage.jsx";
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
      <Route
        path="/"
        element={authUser ? <ChatPage /> : <Navigate to={"/login"} />}
      />
      <Route
        path="/login"
        element={!authUser ? <LoginPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signup"
        element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}
      />
      <Toaster />
    </div>
  );
}

export default App;
