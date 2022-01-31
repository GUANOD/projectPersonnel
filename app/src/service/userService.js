import mainConfig, { httpConfig } from "./config";
import routes from "./routes";

export const getUser = (token = null) => {
  return new Promise((resolve, reject) => {
    const req = httpConfig("GET", token);

    fetch(mainConfig.PORT + routes.userInfo.get, req)
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

export const updateUser = (ufbody = {}, token = null) => {
  const body = JSON.stringify(ufbody);

  return new Promise((resolve, reject) => {
    const req = { ...httpConfig("PUT", token), body };

    fetch(mainConfig.PORT + routes.userInfo.update, req)
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

export const deleteUser = (ufbody = {}, token) => {
  const body = JSON.stringify(ufbody);

  return new Promise((resolve, reject) => {
    const req = { ...httpConfig("DELETE", token), body };

    fetch(mainConfig.PORT + routes.userInfo.delete, req)
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
