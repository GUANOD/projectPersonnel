import React, { useState, useEffect, useContext } from "react";
import { GlobalContext } from "./Context";
import { getUser, updateUser } from "../service/userService";
import Loader from "./Loader";
import styles from "./styles/ClientInfo.module.css";

export default function ClientInfo() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [context, setContext] = useContext(GlobalContext);

  useEffect(() => {
    getUser(context.token)
      .then((data) => {
        setUsername(data.pseudo);
        setName(data.prenom);
        setLastname(data.nom);
        setEmail(data.email);
        setAddress(data.address);
        setLoaded(true);
      })
      .catch((error) => {
        setContext((prevState) => ({ ...prevState, error: error }));
      });
  }, []);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      if (password && password.length < 8) {
        throw new Error("Password must be 8 chars long");
        return;
      }
      updateUser(
        { username, name, lastname, email, address, password },
        context.token
      )
        .then((data) => {
          setContext((prevState) => ({ ...prevState, error: data.res }));
        })
        .catch((error) => {
          setContext((prevState) => ({ ...prevState, error: error }));
        });
    } catch (error) {
      setContext((prevState) => ({ ...prevState, error: error.message }));
    }
  };

  return loaded ? (
    <div className={styles.dash}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <h3 className={styles.h3}>Éditer informations</h3>
        <div>
          <label for="pseudo">Pseudo </label>
          <input
            type="text"
            id="pseudo"
            name="pseudo"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Pseudo"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="fname">Prenom </label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Prenom"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="lname">Nom </label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={lastname}
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            placeholder="Nom"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="pass"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Reset Password"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="mail">Email </label>
          <input
            type="text"
            id="mail"
            name="mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            autocomplete="off"
          />
        </div>
        <div>
          <label for="lname">Address </label>
          <input
            type="text"
            id="address"
            name="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            placeholder="Address"
            autocomplete="off"
          />
        </div>
        <input className={styles.submit} type="submit" value="Submit" />
      </form>
    </div>
  ) : (
    <Loader />
  );
}
