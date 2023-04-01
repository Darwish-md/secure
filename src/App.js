import React from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Contact from "./components/Contact";
import Testimonals from "./components/Testimonals";
import ElectionPage from "./pages/ElectionPage";
import VotingPage from "./pages/VotingPage";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionForm from "./forms/ElectionForm";
import Mission from "./components/Mission";
import Chat from "./components/Chat";

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path='/' element={
          <>
          <Home />
          <Testimonals />
          <Contact />
          </>
        } />
        <Route path='/elections' element={<ElectionPage />} />
        <Route path='/mission' element={<Mission />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/elections/create' element={<ElectionForm />} />
        <Route path='/elections/vote/:id' element={<VotingPage />} />
        <Route path='/elections/dashboard/:id' element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
