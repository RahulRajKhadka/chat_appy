import {Routes}

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