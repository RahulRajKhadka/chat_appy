import {Routes, Route} from 'react-router';
import {LoginPage} from './pages/Loginpage.jsx';
import {SignupPage} from './pages/SignUppage.jsx';
import {ChatPage} from './pages/Chatpage.jsx';

function App() {
  return (
    <div>
      <Routes className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
    