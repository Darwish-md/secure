import React from "react";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Contact from "./forms/ContactForm";
import Elections from "./pages/Elections";
import Vote from "./pages/Vote";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ElectionForm from "./forms/ElectionForm";
import Mission from "./components/Mission";
import Chat from "./components/Chat";
import Profile from "./pages/Profile";
import Engage from "./pages/Engage";
import Features from "./components/Features";

const App = () => {
  return (
    <Router>
      <NavBar />
      <div className="body my-20 flex justify-center flex-col" style={{ minHeight: "70%" }}>
      <Routes>
        <Route exact path='/' element={
          <>
          <Home />
          <Features />
          <Contact />
          </>
        } />
        <Route path='/elections' element={<Elections />} />
        <Route path='/mission' element={<Mission />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/engage' element={<Engage />} />
        <Route path='/elections/create' element={<ElectionForm />} />
        <Route path='/elections/vote/:id' element={<Vote />} />
        <Route path='/elections/dashboard/:id' element={<Dashboard />} />
      </Routes>
</div>
      <Footer />
    </Router>
  );
};

export default App;
