import './App.css';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from "./pages/Store";
import Terms from "./pages/Terms";
import React, { useState } from 'react';
import AuthContext from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import Feedbacks from './pages/Feedbacks';
function App() {
  const [user, setUser] = useState({});

  return (
    <BrowserRouter>
  <SnackbarProvider maxSnack={3}>
      <main>
        <AuthContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/feedbacks" element={<Feedbacks />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </AuthContext.Provider>
      </main>
      </SnackbarProvider>
    </BrowserRouter>
  );
}

export default App;
