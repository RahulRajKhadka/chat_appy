function App() {
  return (
   
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/chat" element={
        <ProtectedRoute>
    </Routes>
  );
}

export default App;