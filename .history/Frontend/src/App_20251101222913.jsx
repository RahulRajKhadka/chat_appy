import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/Loginpage.jsx';
import SignupPage from './pages/Signuppage.jsx';
import ChatPage from './pages/ChatPage.jsx';

function App() {
  return (
   
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={<ChatPage/>} />
      </Routes>
  );
}

export default App;