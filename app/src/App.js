import React, { useContext, useEffect, useState } from "react";
import MenuClient from "./Components/MenuClient";
import "./app.css";
import Nav from "./Components/Nav";
import NotFound from "./Components/NotFound";
import Auth from "./Components/Auth";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Background from "./Components/Background";
import { GlobalContext } from "./Components/Context";
import ErrorHandler from "./Components/ErrorHandler";
import Loader from "./Components/Loader";
import Homepage from "./Components/HomePage";

function App() {
  const [context, setContext] = useContext(GlobalContext);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!context.token) {
      let token = localStorage.getItem("token");

      if (token) {
        setContext((prevState) => ({ ...prevState, token }));
      }
    }
    setLoaded(true);
  }, [context.token]);

  return !loaded ? (
    <Loader />
  ) : (
    <>
      <ErrorHandler />

      <Routes key={location.pathname}>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <>
              <Nav />
              <Homepage />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Nav />

              <Background />
              <Auth />
            </>
          }
        />
        <Route
          path="/management"
          element={
            <div className="Management">
              <Nav />
              <MenuClient />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
