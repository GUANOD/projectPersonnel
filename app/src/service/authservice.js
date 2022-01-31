import mainConfig, { httpConfig } from "./config";
import routes from "./routes";

export const regLog = (reg, ufbody = {}) => {
  //verifier si c'est pour créer compte ou connecter
  const route = reg === "reg" ? routes.auth.reg : routes.auth.login;
  const body = JSON.stringify(ufbody);
  return new Promise((resolve, reject) => {
    const req = { ...httpConfig("POST"), body };
    fetch(mainConfig.PORT + route, req)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) reject(data.err); //si réponse d'erreur reject promise
        resolve(data);
      })
      .catch((error) => {
        reject(error.message); //si erreur de requête, reject promise
      });
  });
};

export const validateToken = (token = null) => {
  return new Promise((resolve, reject) => {
    const req = httpConfig("GET", token);
    fetch(mainConfig.PORT + routes.auth.validate, req)
      .then((res) => res.json())
      .then((data) => {
        if (data.err) reject(data.err);
        resolve(data);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
};
