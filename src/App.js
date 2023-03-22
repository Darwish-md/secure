import React from "react";
import Footer from "./Footer";
import Home from "./Home";
import NavBar from "./NavBar";
import Testimonals from "./Testimonals";
import ElectionPage from "./pages/ElectionPage";
import VotingPage from "./pages/VotingPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionForm from "./forms/ElectionForm";

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
        <Route path='/elections/create' element={<ElectionForm />} />
        <Route path='/elections/vote/:id' element={<VotingPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
