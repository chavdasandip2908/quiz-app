import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import your components
import HomePage from './pages/HomePage';
import CreateTestPage from './pages/CreateTestPage';
import AttemptTestPage from './pages/AttemptTestPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-test" element={<CreateTestPage />} />
          <Route path="/attempt-test" element={<AttemptTestPage />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;

// Example usage in a component
export const showToast = () => {
  toast.success('Operation successful!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};