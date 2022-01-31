import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./Context";
import styles from "./styles/ErrorHandler.module.css";
import { useNavigate } from "react-router-dom";

export default function ErrorHandler() {
  const [context, setContext] = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div
      key={context.error}
      className={styles.container}
      style={
        context.error
          ? { opacity: 1, zIndex: 10000000 }
          : { opacity: 0, zIndex: -1 }
      }
    >
      <p>{context.error}</p>
      <button
        className={styles.submit}
        onClick={() => {
          if (context.route) {
            navigate(context.route);
          }
          setContext((prevState) => ({ ...prevState, error: "", route: "" }));
        }}
      >
        ok
      </button>
    </div>
  );
}
