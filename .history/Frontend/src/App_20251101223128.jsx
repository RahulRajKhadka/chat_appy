import {Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/Loginpage.jsx';
import SignupPage from './pages/Signupage.jsx';
import ChatPage from './pages/Chatpage.jsx';

function App() {
  return (
   
    <Routes>
    
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={<ChatPage/>} />
      </Routes>
  );
}

export default App;