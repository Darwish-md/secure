import React from "react";
import Footer from "./Footer";
import Home from "./Home";
import NavBar from "./NavBar";
import Testimonals from "./Testimonals";
import ElectionPage from "./pages/ElectionPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={
          <>
          <Home />
          <Testimonals />
          </>
        } />
        <Route path='/elections' element={<ElectionPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
