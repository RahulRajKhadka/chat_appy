import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/Loginpage.jsx";
import SignUpPage from "./pages/SignUppage.jsx";
import ChatPage from "./pages/Chatpage.jsx";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore.js";
import PageLoader from "./components/PageLoader.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []); // ✅ EMPTY DEPENDENCY ARRAY - Only run once!

  if (isCheckingAuth) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <ChatPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;