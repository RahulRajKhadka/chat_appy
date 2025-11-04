import { Routes, Route } from "react-router";
import { LoginPage } from "./pages/Loginpage.jsx";
import { SignupPage } from "./pages/SignUppage.jsx";
import { ChatPage } from "./pages/Chatpage.jsx";
import { useEffect } from "react";
import { useAuthStore } from "../src/useAuthStore.js/useAuthStore.js"
import PageLoader from "./components/PageLoader.jsx";

function App() {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) {
    return <PageLoader />;
  }

  console.log("Auth User:", authUser, "Checking Auth:", isCheckingAuth);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 overflow-hidden 
                    bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] 
                      from-indigo-500/20 via-purple-500/10 to-transparent blur-3xl"
      ></div>

      <Routes>
        <Route path="/login" element={authUser ? <LoginPage /><Navigate to="/" /> : } />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
