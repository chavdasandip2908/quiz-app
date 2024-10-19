import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "./components/Loading";
import Error from "./components/Error";


// Lazy load the components
const HomePage = lazy(() => import("./pages/HomePage"));
const CreateTestPage = lazy(() => import("./pages/CreateTestPage"));
const AttemptTestPage = lazy(() => import("./pages/AttemptTestPage"));

function App() {

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-test" element={<CreateTestPage />} />
          <Route path="/attempt-test" element={<AttemptTestPage />} />
          <Route path="/*" element={<Error msg={"Page not Found"} />} />

        </Routes>
        <ToastContainer />
      </Suspense>
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