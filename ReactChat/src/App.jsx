import { useState } from 'react'


import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import J from './components/Joining/J';
import Chat from './components/Chat/Chat';





function App() {
  
  

  return (
   
    <Router>
    <Routes>
      <Route exact path="/" element={<J />} />
      <Route exact path="/chat" element={<Chat />} />
    </Routes>
  </Router> 
   
  )
}

export default App
