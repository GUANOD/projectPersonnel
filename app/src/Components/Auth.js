import React, { useState, useRef, useContext, useEffect } from "react";
import { regLog } from "../service/authservice";
import { GlobalContext } from "./Context";
import styles from "./styles/Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useDidUpdateEffect } from "../hooks/useDidUpdate";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [toggle, setToggle] = useState(false);
  const [context, setContext] = useContext(GlobalContext);
  const userRef = useRef(null);
  const passRef = useRef(null);
  const nameRef = useRef(null);
  const passConfRef = useRef(null);
  const lastnameRef = useRef(null);
  const dateRef = useRef(null);
  const emailRef = useRef(null);
  const addressRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (context.token) {
      navigate("/management");
    }
  }, [context.token]);
  // runs at load, and every time context.token changes..
  // management route denies access, removes token
  // and redirects to login in case token is invalid

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setContext((prevState) => ({
        ...prevState,
        error: "Pseudo ne peut pas être vide",
      }));
      return;
    }

    if (!password) {
      setContext((prevState) => ({
        ...prevState,
        error: "Mot de passe ne peut pas être vide",
      }));
      return;
    }

    if (password.length < 8) {
      setContext((prevState) => ({
        ...prevState,
        error: "Mot de passe doit contenir au moins 8 caractères",
      }));
      return;
    }

    try {
      if (toggle) {
        // TOGGLE MEANS THE CLIENT IS TRYING TO CREATE AN ACCOUNT
        //AS SUCH WE NEED TO WAIT THE ACCOUNT CREATION BEFORE LOGIN
        if (password !== passConfirm) {
          setContext((prevState) => ({
            ...prevState,
            error: "Les mot de pass ne sont pas égales",
          }));
          return;
        }

        await regLog("reg", {
          username,
          name,
          lastname,
          date,
          password,
          email,
          address,
        });
      }

      regLog("log", { username, password })
        .then((data) => {
          setContext((prevState) => ({
            ...prevState,
            token: data.token,
          }));
          localStorage.setItem("token", data.token);
          reset();
        })
        .catch((error) => {
          setContext((prevState) => ({
            ...prevState,
            error: error,
          }));
        });
    } catch (error) {
      setContext((prevState) => ({
        ...prevState,
        error,
      }));
      return;
    }
  };

  const reset = () => {
    setPassword("");
    setUsername("");
    setPassConfirm("");
    userRef.current?.blur();
    passRef.current?.blur();
    passConfRef.current?.blur();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>{toggle ? "Créer compte" : "Se connecter"}</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="username" ref={userRef}>
            Pseudo
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => userRef.current?.classList.add(styles.hover)}
            onBlur={() =>
              !username ? userRef.current?.classList.remove(styles.hover) : ""
            }
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="password" ref={passRef}>
            Mot de passe
          </label>
          <input
            autoComplete="off"
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => passRef.current?.classList.add(styles.hover)}
            onBlur={() =>
              !password ? passRef.current?.classList.remove(styles.hover) : ""
            }
          />
        </div>
        {toggle ? (
          <>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="passConf"
                ref={passConfRef}
              >
                Confirmer mot de passe
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="password"
                name="passConf"
                id="passConf"
                value={passConfirm}
                onChange={(e) => setPassConfirm(e.target.value)}
                onFocus={() => passConfRef.current?.classList.add(styles.hover)}
                onBlur={() =>
                  !passConfirm
                    ? passConfRef.current?.classList.remove(styles.hover)
                    : ""
                }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name" ref={nameRef}>
                Prénom
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => nameRef.current?.classList.add(styles.hover)}
                onBlur={() =>
                  !name ? nameRef.current?.classList.remove(styles.hover) : ""
                }
              />
            </div>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="lastname"
                ref={lastnameRef}
              >
                Nom
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="lastname"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                onFocus={() => lastnameRef.current?.classList.add(styles.hover)}
                onBlur={() =>
                  !lastname
                    ? lastnameRef.current?.classList.remove(styles.hover)
                    : ""
                }
              />
            </div>
            <div className={styles.field}>
              <label
                className={`${styles.label} ${styles.hover}`}
                htmlFor="date"
                ref={dateRef}
              >
                Date de naissance
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                // onFocus={() => dateRef.current?.classList.add(styles.hover)}
                // onBlur={() =>
                //   !date ? dateRef.current?.classList.remove(styles.hover) : ""
                // }
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email" ref={emailRef}>
                E-mail
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => emailRef.current?.classList.add(styles.hover)}
                onBlur={() =>
                  !email ? emailRef.current?.classList.remove(styles.hover) : ""
                }
              />
            </div>
            <div className={styles.field}>
              <label
                className={styles.label}
                htmlFor="address"
                ref={addressRef}
              >
                Address
              </label>
              <input
                autoComplete="off"
                className={styles.input}
                type="text"
                name="address"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onFocus={() => addressRef.current?.classList.add(styles.hover)}
                onBlur={() =>
                  !email
                    ? addressRef.current?.classList.remove(styles.hover)
                    : ""
                }
              />
            </div>
          </>
        ) : (
          ""
        )}

        <input
          className={styles.button}
          type="submit"
          value={toggle ? "Créer compte" : "Se connecter"}
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </form>
      <button
        className={styles.create}
        onClick={() => setToggle(toggle ? false : true)}
      >
        {toggle ? "Se connecter" : "Créer compte"}
      </button>
    </div>
  );
};

export default Auth;
