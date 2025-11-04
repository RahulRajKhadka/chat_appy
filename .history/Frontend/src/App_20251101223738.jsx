import {Routes, Route} from 'react-router-dom';
import LoginPage from './pages/Loginpage.jsx';
import SignupPage from './pages/SignUppage.jsx';
import ChatPage from './pages/Chatpage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUppage/>} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
    